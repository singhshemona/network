import { MarkerType } from 'reactflow';

export const initialNodes = [
  {
    id: '1',
    data: { 
      prompt: 'Why isn’t 1 a prime number?', 
      answer: 'For a number to be prime, it must have two distinct factors, one and itself. For 1, 1 and itself is not distinct.' 
    },
    type: 'textUpdaterNode',
    position: { x: 250, y: 5 },
    className: 'light',
  },
  {
    id: '2',
    data: { 
      prompt: 'What is the difference between a rational and irrational number?', 
      answer: 'Rational numbers can be written as a fraction or ratio and irrational cannot be written as a fraction or ratio.' 
    },
    type: 'textUpdaterNode',
    position: { x: 100, y: 100  },
    className: 'light',
  },
];

export const initialEdges = [
  { 
    id: '1', 
    source: '1', 
    target: '2', 
    type: 'textUpdaterEdge',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { connection: 'default closed arrow' },
  },
];

export const exampleOneNodes = [
  {
    id: '1',
    data: { prompt: '', answer: '' },
    // type: 'textUpdater',
    position: { x: 250, y: 5 },
    className: 'light',
  },
  {
    id: '2',
    data: { prompt: '', answer: '' },
    position: { x: 100, y: 100 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 200 },
  },
  {
    id: '2a',
    data: { prompt: '', answer: '' },
    position: { x: 10, y: 50 },
    parentNode: '2',
  },
  { id: '3', data: { label: 'Node 1' }, position: { x: 320, y: 100 }, className: 'light' },
  {
    id: '4',
    data: { prompt: '', answer: '' },
    position: { x: 320, y: 200 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '4a',
    data: { prompt: '', answer: '' },
    position: { x: 15, y: 65 },
    className: 'light',
    parentNode: '4',
    extent: 'parent',
  },
  {
    id: '4b',
    data: { prompt: '', answer: '' },
    position: { x: 15, y: 120 },
    className: 'light',
    style: { backgroundColor: 'rgba(255, 0, 255, 0.2)', height: 150, width: 270 },
    parentNode: '4',
  },
  {
    id: '4b1',
    data: { prompt: '', answer: '' },
    position: { x: 20, y: 40 },
    className: 'light',
    parentNode: '4b',
  },
  {
    id: '4b2',
    data: { prompt: '', answer: '' },
    position: { x: 100, y: 100 },
    className: 'light',
    parentNode: '4b',
  },
];

export const exampleOneEdges = [
  { id: 'e1-2', source: '1', target: '2', markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  label: 'default closed arrow', },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2a-4a', source: '2a', target: '4a' },
  { id: 'e3-4', source: '3', target: '4', markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  label: 'default closed arrow', },
  { id: 'e3-4b', source: '3', target: '4b' },
  { id: 'e4a-4b1', source: '4a', target: '4b1' },
  { id: 'e4a-4b2', source: '4a', target: '4b2' },
  { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
];