import { useCallback } from 'react';
import './App.css';
import { initialNodes, initialEdges } from './data.js'
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
        >
          <Background variant="dots" />
          {nodes.length > 10 && <MiniMap />}
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;