import React, { useState } from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';
import { EdgeProps, EdgeLabelRenderer, BaseEdge, getBezierPath } from 'reactflow';

export const TextUpdaterEdge = ({ 
  data, 
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd
}: EdgeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);

  const selector = (state: RFState) => ({
    onUpdateEdge: state.onUpdateEdge,
  });

  const { onUpdateEdge } = useStore(selector, shallow);
  const { connection } = data;

  const onClickEdge = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    setIsEditActive(true)
  }

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} markerEnd={markerEnd} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00',
            padding: 5,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            margin: 0,
            pointerEvents: 'all',
          }}
        >
          {isEditActive ?
            <form>
              <label htmlFor="connection">Connection:
                <input 
                  id="connection" 
                  name="connection" 
                  value={connection}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdateEdge(id, event.target.value)} 
                  className="nodrag" />
              </label>
              <button onClick={() => setIsEditActive(false)}>Save</button>
            </form>
            :
            <>
              {connection && <span onClick={(event) => onClickEdge(event)}>{connection ? connection : 'click to add connection'}</span>}
            </>
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
