import React, { useState, useEffect, FormEvent } from 'react';
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
  const [internalStudyMode, setInternalStudyMode] = useState(false);

  const selector = (state: RFState) => ({
    onUpdateEdge: state.onUpdateEdge,
    studyMode: state.studyMode,
    setCurrentlyStudying: state.setCurrentlyStudying,
  });

  const { onUpdateEdge, studyMode, setCurrentlyStudying } = useStore(selector, shallow);
  const { connection } = data;

  useEffect(() => {
    setInternalStudyMode(studyMode ? true : false)
  }, [studyMode])

  const getEdgeText = (connection: string): string => {
    if(internalStudyMode && connection) {
      return 'click to reveal connection'
    } else if(connection) {
      return connection
    } else return 'click to edit connection'
  }

  const handleEdgeClick = () => {
    if(internalStudyMode) {
      setCurrentlyStudying('edge', id)
      setInternalStudyMode(false)
    } else {
      setIsEditActive(true)
    }
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
              <button type="button" onClick={() => setIsEditActive(false)}>Save</button>
            </form>
            :
            <span onClick={handleEdgeClick}>{getEdgeText(connection)}</span>
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
