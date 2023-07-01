import React, { ChangeEvent } from 'react';
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
    nodes: state.nodes,
    edges: state.edges,
    setNodesUploadData: state.setNodesUploadData,
    setEdgesUploadData: state.setEdgesUploadData
  });

  const {
    studyMode, 
    revertToInitialState, 
    setStudyMode,
    nodes,
    edges,
    setNodesUploadData,
    setEdgesUploadData,
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

  const handleDataUpload = (type: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = event => {
        const dataAsJSON = event.target && JSON.parse(event.target.result as string)
        if(type === 'nodes'){
          setNodesUploadData(dataAsJSON)
        } else setEdgesUploadData(dataAsJSON)
      };
    } else return
  };

  return (
    <div className="App">
      <header>
        <menu>
          <ul>
            <li>Seeing Cognition</li>
            <li>About</li>
            <li>Examples</li>
            <li><button onClick={() => createNewNetwork()}>New Network</button></li>
            <li>
              <a 
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(nodes)
                )}`}
                download="nodes-data.json"
              >
                Download Nodes Data
              </a>
            </li>
            <li>
              <a 
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(edges)
                )}`}
                download="edges-data.json"
              >
                Download Edges Data
              </a>
            </li>
            <li>
              <label htmlFor="nodes data">Upload Nodes Data</label>
              <input id="nodes data" type="file" onChange={(event) => handleDataUpload('nodes', event)} />
            </li>
            <li>
              <label htmlFor="edges data">Upload Edges Data</label>
              <input id="nodes data" type="file" onChange={(event) => handleDataUpload('edges', event)} />
            </li>
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
