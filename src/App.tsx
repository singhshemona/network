import React from 'react';
import { useCallback } from 'react';
import { initialNodes, initialEdges } from './data'
import { nodeTypes } from './TextUpdaterNode';
import ReactFlow, { useNodesState, applyNodeChanges, applyEdgeChanges, useEdgesState, addEdge, MiniMap, Background, BackgroundVariant, NodeChange, EdgeChange, Connection, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

export const App = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  
  const createNewNetwork = () => {
    // TODO: add a custom confirm
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved.')) {
      setNodes(initialNodes)
      setEdges(initialEdges)
    }
  }

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

          // needed for updating position of nodes or edges
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}

          // needed for manually connecting two nodes
          onConnect={onConnect} 
        >
          <Background variant={BackgroundVariant.Dots} />
          {nodes.length > 10 && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
}
