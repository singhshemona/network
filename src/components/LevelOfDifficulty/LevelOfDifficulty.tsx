import React from 'react';
import useStore, { RFState } from '../../providers/store';
import { shallow } from 'zustand/shallow';
import { SuperMemoGrade } from 'supermemo';
import { Button } from '../../styles/GeneralStyles';
import { OptionsContainer } from './LevelOfDifficultyStyles';

export const LevelOfDifficulty = () => {
  const selector = (state: RFState) => ({
    currentlyStudying: state.currentlyStudying,
    setNodeGrade: state.setNodeGrade,
    setEdgeGrade: state.setEdgeGrade,
  });

  const { currentlyStudying, setNodeGrade, setEdgeGrade } = useStore(selector, shallow);

  const setGrade = (grade: SuperMemoGrade) => {
    if(currentlyStudying.type === 'node') {
      setNodeGrade(grade)
    } else setEdgeGrade(grade)
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
