import { MarkerType } from "reactflow";

export const initialNodes = [
  {
    id: "1",
    data: {
      prompt:
        "This is an example of a stimulating question, most likely ending in a question mark?",
      answer:
        "And this is the answer to that question or prompt. Thinking of this answer deepens your understanding of the topic overall and this section of your knowledge.",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
    type: "textUpdaterNode",
    position: { x: 750, y: 30 },
  },
  {
    id: "2",
    data: {
      prompt:
        "This is an another example of a stimulating question, most likely ending in a question mark?",
      answer:
        "And this is another answer to that question or prompt. Thinking of this answer deepens your understanding of the topic overall and this section of your knowledge.",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
    type: "textUpdaterNode",
    position: { x: 300, y: 530 },
  },
];

export const initialEdges = [
  {
    id: "1",
    source: "1",
    target: "2",
    type: "textUpdaterEdge",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      connection:
        "The job of the edge is to explain how the two nodes are related to each other. This can depend on how the arrow points, or not if you choose so.",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
  },
];
