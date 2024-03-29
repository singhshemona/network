import { create } from "zustand";
import { initialNodes, initialEdges } from "../data/initial";
import { practice } from "../utils/calculate-grade";
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
} from "reactflow";
import { SuperMemoGrade } from "supermemo";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  setNodesAndEdges: (nodes: Node[], edges: Edge[]) => void;
  studyMode: boolean;
  networkName: string;
  setNetworkName: (networkName: string) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodesUploadData: (nodes: Node[]) => void;
  setEdgesUploadData: (edges: Edge[]) => void;
  onUpdateEdge: (id: string, text: string) => void;
  handleUpdatePrompt: (id: string, text: string) => void;
  handleUpdateAnswer: (id: string, text: string) => void;
  addNewNode: (position: { x: number; y: number }) => void;
  setStudyMode: (boolean: boolean) => void;
  setNodeGrade: (id: string, grade: SuperMemoGrade) => void;
  setEdgeGrade: (id: string, grade: SuperMemoGrade) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  studyMode: false,
  networkName: "Network Name",

  setNodesAndEdges: (nodes: Node[], edges: Edge[]) => {
    set({
      nodes: nodes,
      edges: edges,
    });
  },

  setNetworkName: (networkName: string) => {
    set({
      networkName: networkName,
    });
  },

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
      edges: addEdge(
        {
          ...params,
          data: {
            connection: "click to edit connection",
            grade: {
              interval: 0,
              repetition: 0,
              efactor: 2.5,
              dueDate: "",
            },
          },
          type: "textUpdaterEdge",
        },
        get().edges,
      ),
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

  addNewNode: (position: { x: number; y: number }) => {
    const newNode = {
      id: (get().nodes.length + 1).toString(),
      data: {
        prompt: "click to edit prompt",
        answer: "click to edit answer",
        grade: {
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          dueDate: "",
        },
      },
      type: "textUpdaterNode",
      position: position,
      className: "light",
    };

    set({
      nodes: applyNodeChanges([{ item: newNode, type: "add" }], get().nodes),
    });
  },

  setStudyMode: (boolean: boolean) => {
    set({
      studyMode: boolean,
    });
  },

  setNodeGrade: (id: string, grade: SuperMemoGrade) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          node.data.grade = practice(node.data.grade, grade);
        }
        return node;
      }),
    });
  },

  setEdgeGrade: (id: string, grade: SuperMemoGrade) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === id) {
          edge.data.grade = practice(edge.data.grade, grade);
        }
        return edge;
      }),
    });
  },
}));

export default useStore;
