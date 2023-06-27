import React, { useEffect, useState } from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';

export const TextUpdaterNode = ({ data, id }: NodeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [internalStudyMode, setInternalStudyMode] = useState(false);

  const selector = (state: RFState) => ({
    onUpdatePrompt: state.onUpdatePrompt,
    onUpdateAnswer: state.onUpdateAnswer,
    studyMode: state.studyMode,
  });

  const { onUpdatePrompt, onUpdateAnswer, studyMode } = useStore(selector, shallow);
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

  const onNodeClick = () => {
    if(internalStudyMode) {
      setInternalStudyMode(false)
    } else {
      setIsEditActive(true)
    }
  }

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable />
      {isEditActive ?
        <form>
          <label htmlFor="prompt">Prompt:
            <input 
              id="prompt" 
              name="prompt" 
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdatePrompt(id, event.target.value)} 
              className="nodrag" />
          </label>
          <label htmlFor="answer">Answer:
            <input 
              id="answer" 
              name="answer" 
              value={answer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdateAnswer(id, event.target.value)} 
              className="nodrag" />
          </label>
          <button onClick={() => setIsEditActive(false)}>Save</button>
        </form>
        :
        <div onClick={onNodeClick}>
          {/* TODO: address case for when prompt and answer text are emptied and saved */}
          <p>{getNodeText(prompt, 'prompt')}</p>
          <p>{getNodeText(answer, 'answer')}</p>
        </div>
      }
      <Handle type="source" position={Position.Bottom} id="b" isConnectable />
    </div>
  );
}
