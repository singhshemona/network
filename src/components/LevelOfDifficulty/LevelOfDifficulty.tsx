import React from 'react';
import useStore, { RFState } from '../../providers/store';
import { shallow } from 'zustand/shallow';
import { SuperMemoGrade } from 'supermemo';
import { Button } from '../../styles/GeneralStyles';
import { OptionsContainer } from './LevelOfDifficultyStyles';

type LevelOfDifficultyProps = {
  id: string;
  type: string;
  onClick: () => void;
}
export const LevelOfDifficulty = ({id, type, onClick}: LevelOfDifficultyProps) => {
  const selector = (state: RFState) => ({
    setNodeGrade: state.setNodeGrade,
    setEdgeGrade: state.setEdgeGrade,
  });

  const { setNodeGrade, setEdgeGrade } = useStore(selector, shallow);

  const setGrade = (grade: SuperMemoGrade) => {
    if(type === 'node') {
      setNodeGrade(id, grade)
    } else setEdgeGrade(id, grade)

    onClick()
  }

  return (
    <OptionsContainer>
      <li><Button onClick={() => setGrade(0)}>0</Button></li>
      <li><Button onClick={() => setGrade(1)}>1</Button></li>
      <li><Button onClick={() => setGrade(2)}>2</Button></li>
      <li><Button onClick={() => setGrade(3)}>3</Button></li>
      <li><Button onClick={() => setGrade(4)}>4</Button></li>
      <li><Button onClick={() => setGrade(5)}>5</Button></li>
    </OptionsContainer>
  );
}
