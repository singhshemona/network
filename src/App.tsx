import React from 'react';
import { nodeTypes } from './TextUpdaterNode';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from './store';
import ReactFlow, { MiniMap, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

export const App = () => {
  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    revertToInitialState: state.revertToInitialState,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, revertToInitialState } = useStore(selector, shallow);
  
  const createNewNetwork = () => {
    // TODO: add a custom confirm
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved.')) {
      revertToInitialState()
    }
  }

  // not great, figure out better way to warn on refresh
  // window.onbeforeunload = () => createNewNetwork;

  return (
    <div className="App">
      <header>
        <menu>
          <ul>
            <li>Seeing Cognition</li>
            <li>About</li>
            <li>Examples</li>
            <li><button onClick={() => createNewNetwork()}>New Network</button></li>
          </ul>
        </menu>
        <h1>Section 1: The Big Picture</h1>
      </header>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} 
        >
          <Background variant={BackgroundVariant.Dots} />
          {nodes.length > 10 && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
}
