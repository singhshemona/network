import React from 'react';
import useStore, { RFState } from '../providers/store';
import { shallow } from 'zustand/shallow';
import { SuperMemoGrade } from 'supermemo';

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
    <>
      <ul>
        <li><button onClick={() => setGrade(0)}>0</button></li>
        <li><button onClick={() => setGrade(1)}>1</button></li>
        <li><button onClick={() => setGrade(2)}>2</button></li>
        <li><button onClick={() => setGrade(3)}>3</button></li>
        <li><button onClick={() => setGrade(4)}>4</button></li>
        <li><button onClick={() => setGrade(5)}>5</button></li>
      </ul>
      <p>Click on "about" to understand the scoring.</p>
    </>
  );
}
