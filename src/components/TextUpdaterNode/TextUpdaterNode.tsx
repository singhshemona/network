import React, { useEffect, useState } from 'react';
import useStore, { RFState } from '../../providers/store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';
import { calculateColor } from '../../utils/calculateColor';
import { NodeContainer, Prompt, Answer } from './TextUpdaterNodeStyles';
import { Button, Input, Label, Textarea } from '../../styles/GeneralStyles';

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
  const { prompt, answer, grade } = data;

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

  return (
    <NodeContainer colors={calculateColor(grade.efactor)}>
      <Handle type="target" position={Position.Top} id="a" />
      {isEditActive ?
        <form>
          <Label htmlFor="prompt">Prompt:</Label>
          <Input 
              type="text"
              id="prompt" 
              name="prompt" 
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdatePrompt(id, event.target.value)} 
              className="nodrag" />
          <Label htmlFor="answer">Answer:</Label>
          <Textarea 
            id="answer" 
            name="answer" 
            value={answer}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdateAnswer(id, event.target.value)} 
            className="nodrag"
           />
          <Button type="button" onClick={() => setIsEditActive(false)}>Save</Button>
        </form>
        :
        <div onClick={handleNodeClick}>
          <Prompt>{getNodeText(prompt, 'prompt')}</Prompt>
          <Answer>{getNodeText(answer, 'answer')}</Answer>
        </div>
      }
      <Handle type="source" position={Position.Bottom} id="b" />
    </NodeContainer>
  );
}
