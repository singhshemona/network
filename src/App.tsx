import React, { useRef, useMemo } from 'react';
import { TextUpdaterNode } from './TextUpdaterNode';
import { TextUpdaterEdge } from './TextUpdaterEdge';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from './store';
import ReactFlow, { MiniMap, Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

export const App = () => {
  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    studyMode: state.studyMode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    revertToInitialState: state.revertToInitialState,
    addNewNode: state.addNewNode,
    setStudyMode: state.setStudyMode,
  });

  const { 
    nodes, 
    edges, 
    studyMode, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    revertToInitialState, 
    addNewNode, 
    setStudyMode 
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(() => ({ textUpdaterNode: TextUpdaterNode }), []);
  const edgeTypes = useMemo(() => ({ textUpdaterEdge: TextUpdaterEdge }), []);

  const reactFlowRef = useRef<HTMLInputElement>(null);
  
  const addNode = (event: React.MouseEvent<HTMLElement>) => {
    // don't run if we clicked on the nodes
    let container = document.querySelector('.react-flow__nodes');
    if(event.target instanceof HTMLElement && container?.contains(event.target)) return;

    // TODO: This needs to be debugged
    const bounds = reactFlowRef.current && reactFlowRef.current.getBoundingClientRect();
    const position = {
      x: event.clientX - (bounds ? bounds.left : 0),
      y: event.clientY - (bounds ? bounds.top : 0)
    };
  
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { prompt: 'click to add prompt', answer: 'click to add answer' },
      type: 'textUpdaterNode',
      // position: { x: event.clientX, y: event.clientY },
      position: position,
      className: 'light',
    };

    addNewNode([{item: newNode, type: 'add'}])
  }

  const createNewNetwork = () => {
    // TODO: add a custom confirm
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved.')) {
      revertToInitialState()
    }
  }

  // not great, figure out better way to warn on refresh
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
            <li><button onClick={() => setStudyMode(!studyMode)}>Study Mode: {studyMode ? 'ON' : 'OFF'}</button></li>
          </ul>
        </menu>
        <h1>Section 1: The Big Picture</h1>
        <p>To add a new node, click anywhere on the canvas</p>
      </header>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onClick={addNode}
          ref={reactFlowRef}
        >
          <Background variant={BackgroundVariant.Dots} />
          {nodes.length > 10 && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
}
