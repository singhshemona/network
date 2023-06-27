import React, { useRef, useMemo } from 'react';
import { TextUpdaterNode } from './TextUpdaterNode';
import { TextUpdaterEdge } from './TextUpdaterEdge';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from './store';
import ReactFlow, { MiniMap, Background, BackgroundVariant, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

export const Network = () => {
  const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNewNode: state.addNewNode,
  });

  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNewNode,
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(() => ({ textUpdaterNode: TextUpdaterNode }), []);
  const edgeTypes = useMemo(() => ({ textUpdaterEdge: TextUpdaterEdge }), []);

  const reactFlowRef = useRef<HTMLInputElement>(null);
  const reactFlowInstance = useReactFlow();

  const addNode = (event: React.MouseEvent<HTMLElement>) => {
    // don't run if we clicked within the existing network
    let container = document.querySelector('.react-flow__viewport');
    if(event.target instanceof HTMLElement && container?.contains(event.target)) return;

    const bounds = reactFlowRef.current && reactFlowRef.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - (bounds ? bounds.left : 0),
      y: event.clientY - (bounds ? bounds.top : 0)
    });
  
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { 
        prompt: 'click to edit prompt', 
        answer: 'click to edit answer' 
      },
      type: 'textUpdaterNode',
      position: position,
      className: 'light',
    };

    addNewNode([{item: newNode, type: 'add'}])
  }

  return (
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
  );
}
