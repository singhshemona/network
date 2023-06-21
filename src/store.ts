import { create } from 'zustand';
import { initialNodes, initialEdges } from './data';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeAddChange,
} from 'reactflow';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  revertToInitialState: () => void;
  onUpdatePrompt: (id: string, text: string) => void;
  onUpdateAnswer: (id: string, text: string) => void;
  addNewNode: (changes: NodeAddChange[]) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onUpdatePrompt: (id: string, text: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, prompt: text };
        }
        return node;
      }),
    });
  },
  onUpdateAnswer: (id: string, text: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, answer: text };
        }
        return node;
      }),
    });
  },
  revertToInitialState: () => {
    set({
      nodes: initialNodes,
      edges: initialEdges,
    });
  },
  addNewNode: (changes: NodeAddChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

}));

export default useStore;