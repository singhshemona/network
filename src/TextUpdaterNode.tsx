import React, { FormEvent, useEffect, useState } from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';

export const TextUpdaterNode = ({ data, id }: NodeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [internalStudyMode, setInternalStudyMode] = useState(false);

  const selector = (state: RFState) => ({
    handleUpdatePrompt: state.handleUpdatePrompt,
    handleUpdateAnswer: state.handleUpdateAnswer,
    studyMode: state.studyMode,
    setCurrentlyStudying: state.setCurrentlyStudying,
  });

  const { handleUpdatePrompt, handleUpdateAnswer, studyMode, setCurrentlyStudying } = useStore(selector, shallow);
  const { prompt, answer } = data;

  useEffect(() => {
    setInternalStudyMode(studyMode ? true : false)
  }, [studyMode])

  const getNodeText = (data: string, type: string): string => {
    if(type === 'prompt' && data) {
      return data
    } else if(internalStudyMode && data) {
      return 'click to reveal answer'
    } else if(data) {
      return data
    } else return `click to edit ${type}`
  }

  const handleNodeClick = () => {
    if(internalStudyMode) {
      setCurrentlyStudying('node', id)
      setInternalStudyMode(false)
    } else {
      setIsEditActive(true)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsEditActive(false)
  }

  return (
    <div>
      <Handle type="target" position={Position.Top} id="a" />
      {isEditActive ?
        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt:
            <input 
              id="prompt" 
              name="prompt" 
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdatePrompt(id, event.target.value)} 
              className="nodrag" />
          </label>
          <label htmlFor="answer">Answer:
            <input 
              id="answer" 
              name="answer" 
              value={answer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdateAnswer(id, event.target.value)} 
              className="nodrag" />
          </label>
          <button type="submit">Save</button>
        </form>
        :
        <div onClick={handleNodeClick}>
          <p>{getNodeText(prompt, 'prompt')}</p>
          <p>{getNodeText(answer, 'answer')}</p>
        </div>
      }
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}
