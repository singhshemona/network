import React, { useState, useEffect } from 'react';
import useStore, { RFState } from '../../providers/store';
import { shallow } from 'zustand/shallow';
import { EdgeProps, EdgeLabelRenderer, BaseEdge, getBezierPath } from 'reactflow';
import { calculateColor } from '../../utils/calculateColor';
import { EdgeContainer } from './TextUpdaterEdgeStyles';
import { Button, Input } from '../../styles/GeneralStyles';

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
  const { connection, grade } = data;

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
        <EdgeContainer colors={calculateColor(grade.efactor)} labelX={labelX} labelY={labelY}>
          {isEditActive ?
            <form>
              <label htmlFor="connection">Connection:
                <Input 
                  type="text"
                  id="connection" 
                  name="connection" 
                  value={connection}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUpdateEdge(id, event.target.value)} 
                  className="nodrag" />
              </label>
              <Button type="button" onClick={() => setIsEditActive(false)}>Save</Button>
            </form>
            :
            <span onClick={handleEdgeClick}>{getEdgeText(connection)}</span>
          }
        </EdgeContainer>
      </EdgeLabelRenderer>
    </>
  );
}
