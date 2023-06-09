import { useCallback } from 'react';
import './App.css';
import { initialNodes, initialEdges } from './data.js'
import { nodeTypes } from './TextUpdaterNode.js';
import ReactFlow, { useNodesState, applyNodeChanges, applyEdgeChanges, useEdgesState, addEdge, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function App() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="App">
      <header>
        <menu>
          <ul>
            <li>Seeing Cognition</li>
            <li>About</li>
          </ul>
        </menu>
        <h1>Section 1: The Big Picture</h1>
      </header>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect} 
          nodeTypes={nodeTypes}
        >
          <Background variant="dots" />
          {nodes.length > 10 && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;