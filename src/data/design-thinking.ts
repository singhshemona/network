import { MarkerType } from 'reactflow';

export const designThinkingNodes = [
  {
    id: '1',
    data: { 
      prompt: 'What does Design Thinking bring together?', 
      answer: 
        `
          1) Desirability - What makes sense to people and for people?
          2) Feasibility - What is technically possible within the foreseeable future?
          3) Viability - What is likely to become part of a sustainable business model?
        `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: -349, y: 3 },
  },
  {
    id: '2',
    data: { 
      prompt: 'What kind of problems does Design Thinking help solve?', 
      answer: 'Problems for which neither question nor answer is well-defined. Like, how to decrease traffic accidents? How to fix global warming?',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: -602, y: 422 },
  },
  {
    id: '3',
    data: { 
      prompt: 'Why use Design Thinking?', 
      answer: 'By using design thinking, you make decisions based on what customers really want instead of relying only on historical data or making risky bets based on instinct instead of evidence.',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 618, y:  38 },
  },
  {
    id: '4',
    data: { 
      prompt: 'What is Genchi genbutsu?', 
      answer: 
        `
        A Japanese concept meaning “Go and See”. It was coined as part of the development of the Toyota Production System. It illustrates the importance of being on the factory floor where production is happening so that you can see both the creation of value and the generating of waste. 
        The 7 kinds of waste found in the workplace:
          1) Overproduction
          2) Existence of unnecessary things
          3) Blockage of flow
          4) Unnecessary work being done (lack of knowledge or training)
          5) Movement due to inefficient setup of workplace
          6) Production of defects
          7) Overstock - maintaining oversized warehouses that hides problems
        `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 1291, y: -185  },
  },
  {
    id: '5',
    data: { 
      prompt: 'What are The Five Why\'s?', 
      answer:  
      `
        A technique for finding the root cause of a problem. 
        I have a headache...
          1) Why? Because I have a cold.
          2) Why? Because yesterday I spent time in the cold.
          3) Why? Because I didn't take my coat.
          4) Why? Because I didn't think that it would be so cold outside.
          5) Why? Because in the morning I don't check the weather forecast.
      `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 789, y: 345 },
  },
  {
    id: '6',
    data: { 
      prompt: 'How does Stanford approach the Design Thinking process?', 
      answer:  
      `
        1) Empathy
        2) Define the problem
        3) Ideate - The design thinking process goes through a cycle of generative flaring and selective focusing. In the definition phase, we narrowed down to a specific Point of View; now, in the ideation phase, we flare out and generate as many ideas as possible.
        4) Prototype 
        5) Test
      `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: -73, y: 315 },
  },
  {
    id: '7',
    data: { 
      prompt: 'How does a designer define empathy?', 
      answer: 'Empathy is a journey into the feelings of others, it gives you the insights you need to solve hard, worthwhile problems.',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: -490, y:  885 },
  },
  {
    id: '8',
    data: { 
      prompt: 'What is a Point of View?', 
      answer:  
      `
        A POV consists of answers to the following:
        1) Who is your user?
        2) What is their deep, unmet need?
        3) Why is this insightful?

        POV Madlib structure: "[USER] needs to [USER’S NEED] because [SURPRISING INSIGHT]"
      `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 865, y: 683 },
  },
  {
    id: '9',
    data: { 
      prompt: 'What’s the best fidelity for prototyping?', 
      answer: '"Screw paper prototypes. If you use a paper prototype, the user is immediately going to give you feedback like \'oh it\'s interesting you put the button there, I would try putting the button here.\' That kind of feedback is useless to you. That\'s your job as a designer to figure out where to put the button. What you want is to get reactions from people. And to get reactions from people you need to suspend their disbelief. And that means making something that feels real. But, don\'t spend more than 2 days making it." That said, if you are working out the flow of a new feature or trying to communicate ideas to team members, sketches and paper prototypes are completely valid ways of moving forward.',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 33, y:  857 },
  },
  {
    id: '10',
    data: { 
      prompt: 'How should testing be approached?', 
      answer:  
      `
        Prototype as if you know you’re right, but test as if you know you’re wrong.
        1) Set objectives
        2) Recruit users
        3) Test - consider bringing multiple prototypes to react to
      `,
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
    type: 'textUpdaterNode',
    position: { x: 629, y: 939 },
  },
];

export const designThinkingEdges = [
  { 
    id: '1', 
    source: '1', 
    target: '5', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'How to figure out what makes sense to people',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '2', 
    source: '1', 
    target: '2', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'Where cross analysis thinking helps',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '3', 
    source: '4', 
    target: '5', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'Gathering data to solve a problem',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '4', 
    source: '6', 
    target: '7', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'How empathy actually looks like in the field',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '5', 
    source: '6', 
    target: '8', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'Generating a POV',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '6', 
    source: '6', 
    target: '9', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'How might a prototype be built?',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
  { 
    id: '7', 
    source: '6', 
    target: '10', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { 
      connection: 'How do we actually test what we\'ve prototyped',
      grade: {
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        dueDate: '',
      }
    },
  },
];