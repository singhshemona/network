import React, { useState } from 'react';
import { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

type TextUpdaterNodeProps = {
  prompt?: string;
  answer?: string;
}

const TextUpdaterNode = ({ data, id }: NodeProps<TextUpdaterNodeProps>) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const onPromptChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(id);
  }, [id]);

  const onAnswerChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  console.log(data)
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable />
      <p>test</p>
      <button onClick={() => setIsEditActive(prevState => !prevState)}>{isEditActive ? 'save' : 'edit'}</button>
      {isEditActive ?
        <>
          <label htmlFor="prompt">Prompt:
            <input id="prompt" name="prompt" onChange={onPromptChange} className="nodrag" />
          </label>
          <label htmlFor="answer">Answer:
            <input id="answer" name="answer" onChange={onAnswerChange} className="nodrag" />
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
