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
  studyMode: boolean;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  revertToInitialState: () => void;
  onUpdateEdge: (id: string, text: string) => void;
  onUpdatePrompt: (id: string, text: string) => void;
  onUpdateAnswer: (id: string, text: string) => void;
  addNewNode: (changes: NodeAddChange[]) => void;
  setStudyMode: (boolean: boolean) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  studyMode: false,
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
  onUpdateEdge: (id: string, text: string) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === id) {
          edge.data = { ...edge.data, connection: text };
        }
        return edge;
      }),
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
  setStudyMode: (boolean: boolean) => {
    set({
      studyMode: boolean,
    })
  }
}));

export default useStore;
