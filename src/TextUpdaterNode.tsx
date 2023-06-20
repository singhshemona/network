import React, { useState } from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';
import { Handle, Position, NodeProps } from 'reactflow';

type TextUpdaterNodeProps = {
  prompt?: string;
  answer?: string;
}

const TextUpdaterNode = ({ data, id }: NodeProps<TextUpdaterNodeProps>) => {
  const [isEditActive, setIsEditActive] = useState(false);

  const selector = (state: RFState) => ({
    onUpdatePrompt: state.onUpdatePrompt,
    onUpdateAnswer: state.onUpdateAnswer,
  });

  const { onUpdatePrompt, onUpdateAnswer } = useStore(selector, shallow);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable />
      <p>test</p>
      <button onClick={() => setIsEditActive(prevState => !prevState)}>{isEditActive ? 'save' : 'edit'}</button>
      {isEditActive ?
        <>
          <label htmlFor="prompt">Prompt:
            <input id="prompt" name="prompt" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdatePrompt(id, event.target.value)} className="nodrag" />
          </label>
          <label htmlFor="answer">Answer:
            <input id="answer" name="answer" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdateAnswer(id, event.target.value)} className="nodrag" />
          </label>
        </>
        :
        <>
          <p>{data.prompt ? data.prompt : ''}</p>
          <p>{data.answer ? data.answer : ''}</p>
        </>
      }
      <Handle type="source" position={Position.Bottom} id="b" isConnectable />
    </div>
  );
}

export const nodeTypes = { textUpdater: TextUpdaterNode };
