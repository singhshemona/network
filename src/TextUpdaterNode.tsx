import React, { useState } from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';

export const TextUpdaterNode = ({ data, id }: NodeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);

  const selector = (state: RFState) => ({
    onUpdatePrompt: state.onUpdatePrompt,
    onUpdateAnswer: state.onUpdateAnswer,
  });

  const { onUpdatePrompt, onUpdateAnswer } = useStore(selector, shallow);
  const { prompt, answer } = data;

  console.log(prompt.length)
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
        <div onClick={() => setIsEditActive(true)}>
          {/* TODO: address case for when prompt and answer text are emptied and saved */}
          {prompt && <p>{prompt ? prompt : 'click to edit prompt'}</p>}
          {answer && <p>{answer ? answer : 'click to edit answer'}</p>}
        </div>
      }
      <Handle type="source" position={Position.Bottom} id="b" isConnectable />
    </div>
  );
}
