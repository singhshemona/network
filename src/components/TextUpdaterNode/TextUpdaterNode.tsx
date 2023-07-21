import React, { useEffect, useState } from 'react';
import useStore, { RFState } from '../../providers/store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';
import { calculateColor } from '../../utils/calculate-color';
import { NodeContainer, Prompt, Answer, ReactQuillStyled } from './TextUpdaterNodeStyles';
import { Button, Input, Label, Form, DefaultContent } from '../../styles/GeneralStyles';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import { LevelOfDifficulty } from '../LevelOfDifficulty/LevelOfDifficulty';

export const TextUpdaterNode = ({ data, id }: NodeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [internalStudyMode, setInternalStudyMode] = useState(false);
  const [showGrading, setShowGrading] = useState(false);

  const selector = (state: RFState) => ({
    handleUpdatePrompt: state.handleUpdatePrompt,
    handleUpdateAnswer: state.handleUpdateAnswer,
    studyMode: state.studyMode,
  });

  const { handleUpdatePrompt, handleUpdateAnswer, studyMode } = useStore(selector, shallow);
  const { prompt, answer, grade } = data;

  useEffect(() => {
    setInternalStudyMode(studyMode ? true : false)
  }, [studyMode])

  const getNodeText = (data: string, type: string): string => {
    if(type === 'prompt' && data) {
      return data
    } else if(internalStudyMode && data) {
      return 'Click to reveal answer'
    } else if(data) {
      return data
    } else return `Click to edit ${type}`
  }

  const handleNodeClick = () => {
    if(internalStudyMode) {
      setInternalStudyMode(false)
      setShowGrading(true)
    } else if(showGrading) {
      setShowGrading(false)
    } else {
      setIsEditActive(true)
    }
  }

  const handleAnswerChange = (content: string) => {
    handleUpdateAnswer(id, content)
  }

  const sanitizedData = (data: string) => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
    <NodeContainer colors={calculateColor(grade.efactor)}>
      <Handle type="target" position={Position.Top} id="a" />
      {isEditActive ?
        <Form>
          <Label htmlFor="prompt">Prompt:</Label>
          <Input 
              type="text"
              id="prompt" 
              name="prompt" 
              value={prompt}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdatePrompt(id, event.target.value)} 
              className="nodrag" />
          <Label htmlFor="answer">Answer:</Label>
          <ReactQuillStyled
            modules={{
              clipboard: {
                matchVisual: false,
              },
            }}
            id="answer" 
            className="nodrag" 
            theme="snow" 
            value={answer} 
            onChange={handleAnswerChange} 
          />
          <Button type="button" onClick={() => setIsEditActive(false)}>Save</Button>
        </Form>
        :
        <DefaultContent onClick={handleNodeClick}>
          <Prompt>{getNodeText(prompt, 'prompt')}</Prompt>
          <Answer dangerouslySetInnerHTML={sanitizedData(getNodeText(answer, 'answer'))} />
          {showGrading && <LevelOfDifficulty id={id} type="node" onClick={() => setShowGrading(false)} />}
        </DefaultContent>
      }
      <Handle type="source" position={Position.Bottom} id="b" />
    </NodeContainer>
  );
}
