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
  addNewNode: (position: {x: number, y: number}) => void;
  setStudyMode: (boolean: boolean) => void;
  currentlyStudying: {type: string | undefined, id: string | undefined};
  setCurrentlyStudying: (type: string, id: string) => void;
  setNodeScore: (score: number) => void;
  setEdgeScore: (score: number) => void;
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
  onConnect: (params: Connection) => {
    set({
      edges: addEdge({ ...params, 
        data: { 
          connection: 'click to edit connection',
          grade: {
            interval: 0,
            repetition: 0,
            efactor: 2.5,
            dueDate: '',
          }
        },
        type: 'textUpdaterEdge',
      }, get().edges),
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
  addNewNode: (position: {x: number, y: number}) => {
    const newNode = {
      id: (get().nodes.length + 1).toString(),
      data: { 
        prompt: 'click to edit prompt', 
        answer: 'click to edit answer',
        grade: {
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: '',
        }
      },
      type: 'textUpdaterNode',
      position: position,
      className: 'light',
    };

    set({
      nodes: applyNodeChanges([{item: newNode, type: 'add'}], get().nodes),
    });
  },
  setStudyMode: (boolean: boolean) => {
    set({
      studyMode: boolean,
    })
  },
  currentlyStudying: {type: undefined, id: undefined},
  setCurrentlyStudying: (type: string, id: string) => {
    set({
      currentlyStudying: {type: type, id: id},
    })
  },


  // in these functions is where I do supermemo practice function stuff
  setNodeScore: (score: number) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === get().currentlyStudying.id) {
          node.data.grade = { ...node.data.grade };
          // node.data.grade = practice(flashcard, score);
        }
        return node;
      }),
    });
  },
  setEdgeScore: (score: number) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === get().currentlyStudying.id) {
          edge.data.grade = { ...edge.data.grade };
        }
        return edge;
      }),
    });
  },
}));

export default useStore;
