import React from 'react';
import useStore, { RFState } from './store';
import { shallow } from 'zustand/shallow';

export const LevelOfDifficulty = () => {
  const selector = (state: RFState) => ({
    currentlyStudying: state.currentlyStudying,
    setNodeScore: state.setNodeScore,
    setEdgeScore: state.setEdgeScore,
  });

  const { currentlyStudying, setNodeScore, setEdgeScore } = useStore(selector, shallow);

  const setScore = (score: number) => {
    if(currentlyStudying.type === 'node') {
      setNodeScore(score)
    } else setEdgeScore(score)
  }

  return (
    <>
      <ul>
        <li><button onClick={() => setScore(0)}>0</button></li>
        <li><button onClick={() => setScore(1)}>1</button></li>
        <li><button onClick={() => setScore(2)}>2</button></li>
        <li><button onClick={() => setScore(3)}>3</button></li>
        <li><button onClick={() => setScore(4)}>4</button></li>
        <li><button onClick={() => setScore(5)}>5</button></li>
      </ul>
      <p>Click on "about" to understand the scoring.</p>
    </>
  );
}
