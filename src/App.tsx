import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { Network } from './components/Network';
import { Header } from './components/Header/Header';
import { AppContainer, ReactFlowContainer } from './styles/GeneralStyles';
import './styles/over-ride.css'

export const App = () => {
  return (
    <AppContainer>
      <Header />
      <ReactFlowContainer>
        <ReactFlowProvider>
          <Network />
        </ReactFlowProvider>
      </ReactFlowContainer>
    </AppContainer>
  );
}
