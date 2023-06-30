import React from 'react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from './store';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { Network } from './Network';
import { LevelOfDifficulty } from './LevelOfDifficulty';

export const App = () => {
  const selector = (state: RFState) => ({
    studyMode: state.studyMode,
    revertToInitialState: state.revertToInitialState,
    setStudyMode: state.setStudyMode,
  });

  const {
    studyMode, 
    revertToInitialState, 
    setStudyMode 
  } = useStore(selector, shallow);

  const createNewNetwork = () => {
    // TODO: add a custom confirm
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved.')) {
      revertToInitialState()
    }
  }

  // TODO: not great, figure out better way to warn on refresh
  window.onbeforeunload = () => createNewNetwork;

  return (
    <div className="App">
      <header>
        <menu>
          <ul>
            <li>Seeing Cognition</li>
            <li>About</li>
            <li>Examples</li>
            <li><button onClick={() => createNewNetwork()}>New Network</button></li>
            <li>Study Mode: <button onClick={() => setStudyMode(!studyMode)}>{studyMode ? 'ON' : 'OFF'}</button></li>
          </ul>
        </menu>
        {studyMode && <LevelOfDifficulty />}
        <h1>Section 1: The Big Picture</h1>
        <p>To add a new node, click anywhere on the canvas. To delete a node or edge, click on it and hit your keyboard's delete button.</p>
      </header>
      <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Network />
      </ReactFlowProvider>
      </div>
    </div>
  );
}
