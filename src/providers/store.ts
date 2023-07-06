import { create } from 'zustand';
import { initialNodes, initialEdges } from '../data/data';
import { practice } from '../utils/calculateGrade';
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
import { SuperMemoGrade } from 'supermemo';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  studyMode: boolean;
  currentlyStudying: {type: string | undefined, id: string | undefined};
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  revertToInitialState: () => void;
  setNodesUploadData: (nodes: Node[]) => void;
  setEdgesUploadData: (edges: Edge[]) => void;
  onUpdateEdge: (id: string, text: string) => void;
  handleUpdatePrompt: (id: string, text: string) => void;
  handleUpdateAnswer: (id: string, text: string) => void;
  addNewNode: (position: {x: number, y: number}) => void;
  setStudyMode: (boolean: boolean) => void;
  setCurrentlyStudying: (type: string, id: string) => void;
  setNodeGrade: (grade: SuperMemoGrade) => void;
  setEdgeGrade: (grade: SuperMemoGrade) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  studyMode: false,
  currentlyStudying: {type: undefined, id: undefined},

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

  handleUpdatePrompt: (id: string, text: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, prompt: text };
        }
        return node;
      }),
    });
  },

  handleUpdateAnswer: (id: string, text: string) => {
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

  setNodesUploadData: (nodes: Node[]) => {
    set({
      nodes: nodes,
    });
  },

  setEdgesUploadData: (edges: Edge[]) => {
    set({
      edges: edges,
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

  setCurrentlyStudying: (type: string, id: string) => {
    set({
      currentlyStudying: {type: type, id: id},
    })
  },

  setNodeGrade: (grade: SuperMemoGrade) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === get().currentlyStudying.id) {
          node.data.grade = practice(node.data.grade, grade);
        }
        return node;
      }),
    });
  },

  setEdgeGrade: (grade: SuperMemoGrade) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === get().currentlyStudying.id) {
          edge.data.grade = practice(edge.data.grade, grade);
        }
        return edge;
      }),
    });
  },
}));

export default useStore;
