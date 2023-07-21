// import dayjs from 'dayjs';
import { MarkerType } from "reactflow";

export const writingWellNodes = [
  {
    id: "1",
    data: {
      prompt: "What is writing quality the product of?",
      answer: "Novelty multiplied by Resonance",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
        // dueDate: dayjs(Date.now()).toISOString(),
      },
    },
    type: "textUpdaterNode",
    position: { x: 178, y: 71 },
  },
  {
    id: "2",
    data: {
      prompt: "What are the 5 types of novelty?",
      answer: `
          1) Counter-intuitive - "Oh, I never realized the world worked that way."
          2) Counter-narrative — "Wow, that's not how I was told the world worked!"
          3) Shock and awe — "That's crazy. I would have never believed it."
          4) Elegant articulations — "Beautiful. I couldn't have said it better myself."
          5) Make someone feel seen — "Yes! That's exactly how I feel!"
        `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
    type: "textUpdaterNode",
    position: { x: 10, y: 362 },
  },
  {
    id: "3",
    data: {
      prompt: "How do you make something resonate?",
      answer: "Stories, analogies, examples, and authentic voice",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
        // dueDate: dayjs(Date.now()).toISOString(),
      },
    },
    type: "textUpdaterNode",
    position: { x: 411, y: 272 },
  },
  {
    id: "4",
    data: {
      prompt:
        "An intro must hook the reader. What are the two ways to accomplish this?",
      answer: `
          1) Give readers a reason to care about our hook. Connect it to meaningful problems they face. (Failing to do this is where most intros go wrong.)"
          2) Hook readers with half of an interesting story.
        `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
    type: "textUpdaterNode",
    position: { x: 1021, y: 107 },
  },
  {
    id: "5",
    data: {
      prompt: "What should you do if you can't find good hooks on your own?",
      answer:
        "Ask others what questions they most want answered on your topic. Find the answers then turn those into hooks. (He lists good examples about halfway down on this page: https://www.julian.com/guide/write/ideas).",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
        // dueDate: dayjs(Date.now()).toISOString(),
      },
    },
    type: "textUpdaterNode",
    position: { x: 931, y: 451 },
  },
];

export const writingWellEdges = [
  {
    id: "1",
    source: "1",
    target: "2",
    type: "textUpdaterEdge",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      connection: "What creates novelty",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
  },
  {
    id: "2",
    source: "1",
    target: "3",
    type: "textUpdaterEdge",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      connection: "Where does resonance originate",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
  },
  {
    id: "3",
    source: "3",
    target: "4",
    type: "textUpdaterEdge",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      connection:
        "Getting the readers attention in the beginning versus keeping it throughout. This can be the differenc between a clickbait title and a thought-provoking read.",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
  },
  {
    id: "4",
    source: "4",
    target: "5",
    type: "textUpdaterEdge",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: {
      connection: "Generating a good hook",
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: "",
      },
    },
  },
];
