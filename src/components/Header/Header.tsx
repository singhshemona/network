import React, { useState, ChangeEvent } from 'react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../../providers/store';
import { LevelOfDifficulty } from '../LevelOfDifficulty/LevelOfDifficulty';
import { HeaderContainer, Menu, Title, NetworkName, HeaderSecondLayerContainer } from './HeaderStyles';
import { Dropdown } from '../Dropdown/Dropdown';
import { Button, Input } from '../../styles/GeneralStyles';
import { AboutContent } from './components/AboutContent';
import { DownloadUploadContent } from './components/DownloadUploadContent';

export const Header = () => {
  const [editNetworkName, setEditNetworkName] = useState(false);

  const selector = (state: RFState) => ({
    studyMode: state.studyMode,
    revertToInitialState: state.revertToInitialState,
    setStudyMode: state.setStudyMode,
    networkName: state.networkName,
    setNetworkName: state.setNetworkName
  });

  const {
    studyMode, 
    revertToInitialState, 
    setStudyMode,
    networkName,
    setNetworkName
  } = useStore(selector, shallow);

  const createNewNetwork = () => {
    // TODO: add a custom confirm
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved.')) {
      revertToInitialState()
    }
  }

  // TODO: not great, figure out better way to warn on refresh
  window.onbeforeunload = () => createNewNetwork;

  return (
    <HeaderContainer>
      <Menu>
        <li><Title>Adjacent</Title></li>
        <Dropdown trigger="About" contents={<AboutContent />} />
        <Dropdown trigger="Examples" contents={<ul><li>Example 1</li><li>Example 2</li></ul>} />
        <li><Button onClick={() => createNewNetwork()}>New Network</Button></li>
        <Dropdown trigger="Load & Download Data" contents={<DownloadUploadContent />} />
      </Menu>
      <HeaderSecondLayerContainer>
        {editNetworkName ?
          <>
            <label htmlFor="network name">Change Network Name</label>
            <Input value={networkName} id="network name" type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setNetworkName(event.target.value)} />
            <Button onClick={() => setEditNetworkName(false)}>Save</Button>
          </>
          :
          <NetworkName onClick={() => setEditNetworkName(true)}>{networkName}</NetworkName>
        }
        <span>Study Mode: <Button onClick={() => setStudyMode(!studyMode)}>{studyMode ? 'ON' : 'OFF'}</Button></span>
        {studyMode && <LevelOfDifficulty />}
      </HeaderSecondLayerContainer>
    </HeaderContainer>
  );
}
