import React from 'react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../../../providers/store';
import { writingWellNodes, writingWellEdges } from '../../../data/writing-well';
import { Button } from '../../../styles/GeneralStyles';

export const ExamplesContent = () => {
  const selector = (state: RFState) => ({
    setNodesAndEdges: state.setNodesAndEdges,
  });

  const { setNodesAndEdges } = useStore(selector, shallow);

  return (
    <ul>
      <li><Button onClick={() => setNodesAndEdges(writingWellNodes, writingWellEdges)}>Writing Well</Button></li>
      <li>Example 2</li>
    </ul>
  );
}
