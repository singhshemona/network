import React, { ChangeEvent, useState } from 'react';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../../providers/store';
import { LevelOfDifficulty } from '../../components/LevelOfDifficulty';
import { HeaderContainer, Menu, Title, NetworkName } from './HeaderStyles';

export const Header = () => {
  const [editNetworkName, setEditNetworkName] = useState(false);

  const selector = (state: RFState) => ({
    studyMode: state.studyMode,
    revertToInitialState: state.revertToInitialState,
    setStudyMode: state.setStudyMode,
    nodes: state.nodes,
    edges: state.edges,
    setNodesUploadData: state.setNodesUploadData,
    setEdgesUploadData: state.setEdgesUploadData,
    networkName: state.networkName,
    setNetworkName: state.setNetworkName
  });

  const {
    studyMode, 
    revertToInitialState, 
    setStudyMode,
    nodes,
    edges,
    setNodesUploadData,
    setEdgesUploadData,
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

  const handleDataUpload = (type: string, event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = event => {
        const dataAsJSON = event.target && JSON.parse(event.target.result as string)
        if(type === 'nodes'){
          setNodesUploadData(dataAsJSON)
        } else setEdgesUploadData(dataAsJSON)
      };
    } else return
  };

  return (
    <HeaderContainer>
      <Menu>
        <li><Title>Adjacent</Title></li>
        <li>About</li>
        <li>Examples</li>
        <li><button onClick={() => createNewNetwork()}>New Network</button></li>
        <li>
          <a 
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(nodes)
            )}`}
            download="nodes-data.json"
          >
            Download Nodes Data
          </a>
        </li>
        <li>
          <a 
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(edges)
            )}`}
            download="edges-data.json"
          >
            Download Edges Data
          </a>
        </li>
        <li>
          <label htmlFor="nodes data">Upload Nodes Data</label>
          <input id="nodes data" type="file" onChange={(event) => handleDataUpload('nodes', event)} />
        </li>
        <li>
          <label htmlFor="edges data">Upload Edges Data</label>
          <input id="nodes data" type="file" onChange={(event) => handleDataUpload('edges', event)} />
        </li>
        <li>Study Mode: <button onClick={() => setStudyMode(!studyMode)}>{studyMode ? 'ON' : 'OFF'}</button></li>
      </Menu>
      {studyMode && <LevelOfDifficulty />}
      {editNetworkName ?
        <>
          <li>
            <label htmlFor="network name">Change Network Name</label>
            <input value={networkName} id="network name" type="text" onChange={(event) => setNetworkName(event.target.value)} />
          </li>
          <button onClick={() => setEditNetworkName(false)}>Save</button>
        </>
        
        :
        <NetworkName onClick={() => setEditNetworkName(true)}>{networkName}</NetworkName>
      }
      <p>To add a new node, click anywhere on the canvas. To delete a node or edge, click on it and hit your keyboard's delete button.</p>
    </HeaderContainer>
  );
}
