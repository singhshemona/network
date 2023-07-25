import React, { useState, useEffect } from "react";
import useStore, { RFState } from "../../providers/store";
import { shallow } from "zustand/shallow";
import {
  EdgeProps,
  EdgeLabelRenderer,
  BaseEdge,
  getBezierPath,
} from "reactflow";
import { calculateColor } from "../../utils/calculate-color";
import { EdgeContainer, Textarea } from "./TextUpdaterEdgeStyles";
import { Button, Form, DefaultContent } from "../../styles/GeneralStyles";
import { LevelOfDifficulty } from "../LevelOfDifficulty/LevelOfDifficulty";

export const TextUpdaterEdge = ({
  data,
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [internalStudyMode, setInternalStudyMode] = useState(false);
  const [showGrading, setShowGrading] = useState(false);

  const selector = (state: RFState) => ({
    onUpdateEdge: state.onUpdateEdge,
    studyMode: state.studyMode,
  });

  const { onUpdateEdge, studyMode } = useStore(selector, shallow);
  const { connection, grade } = data;

  useEffect(() => {
    setInternalStudyMode(studyMode ? true : false);
  }, [studyMode]);

  const getEdgeText = (connection: string): string => {
    if (internalStudyMode && connection) {
      return "Click to reveal connection";
    } else if (connection) {
      return connection;
    } else return "Click to edit connection";
  };

  const handleEdgeClick = () => {
    if (internalStudyMode) {
      setInternalStudyMode(false);
      setShowGrading(true);
    } else if (showGrading) {
      setShowGrading(false);
    } else {
      setIsEditActive(true);
    }
  };

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
        <EdgeContainer
          $colors={calculateColor(grade.efactor)}
          $labelX={labelX}
          $labelY={labelY}
        >
          {isEditActive ? (
            <Form>
              <label htmlFor="connection">
                Connection:
                <Textarea
                  id="connection"
                  name="connection"
                  value={connection}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    onUpdateEdge(id, event.target.value)
                  }
                  className="nopan"
                />
              </label>
              <Button type="button" onClick={() => setIsEditActive(false)}>
                Save
              </Button>
            </Form>
          ) : (
            <DefaultContent onClick={handleEdgeClick}>
              <span>{getEdgeText(connection)}</span>
              {showGrading && (
                <LevelOfDifficulty
                  id={id}
                  type="edge"
                  onClick={() => setShowGrading(false)}
                />
              )}
            </DefaultContent>
          )}
        </EdgeContainer>
      </EdgeLabelRenderer>
    </>
  );
};
