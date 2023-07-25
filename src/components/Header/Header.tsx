import React, { useState, ChangeEvent, DragEvent } from "react";
import { shallow } from "zustand/shallow";
import useStore, { RFState } from "../../providers/store";
import {
  HeaderContainer,
  Menu,
  Title,
  NetworkName,
  HeaderSecondLayerContainer,
  NetworkNameEditContainer,
} from "./HeaderStyles";
import { Dropdown } from "../Dropdown/Dropdown";
import { Button, Input } from "../../styles/GeneralStyles";
import { AboutContent } from "./components/AboutContent";
import { DownloadUploadContent } from "./components/DownloadUploadContent";
import { initialEdges, initialNodes } from "../../data/initial";
import { ExamplesContent } from "./components/ExamplesContent";

export const Header = () => {
  const [editNetworkName, setEditNetworkName] = useState(false);

  const selector = (state: RFState) => ({
    studyMode: state.studyMode,
    setNodesAndEdges: state.setNodesAndEdges,
    setStudyMode: state.setStudyMode,
    networkName: state.networkName,
    setNetworkName: state.setNetworkName,
    addNewNode: state.addNewNode,
  });

  const {
    studyMode,
    setNodesAndEdges,
    setStudyMode,
    networkName,
    setNetworkName,
    addNewNode,
  } = useStore(selector, shallow);

  const createNewNetwork = () => {
    if (
      // TODO: add a custom confirm
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "Are you sure you want to create a new Network? This will clear the canvas. Any work you did will not be saved."
      )
    ) {
      setNodesAndEdges(initialNodes, initialEdges);
    }
  };

  // TODO: not great, figure out better way to warn on refresh
  window.onbeforeunload = () => createNewNetwork;

  const onDragStart = (
    event: DragEvent<HTMLButtonElement>,
    nodeType: string
  ) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const addNode = () => {
    addNewNode({
      x: 20,
      y: 20,
    });
  };

  return (
    <HeaderContainer>
      <Menu>
        <li>
          <Title>Adjacent</Title>
        </li>
        <li>
          <Dropdown trigger="About" contents={<AboutContent />} />
        </li>
        <li>
          <Dropdown trigger="Examples" contents={<ExamplesContent />} />
        </li>
        <li>
          <Dropdown
            trigger="Load & Download Data"
            contents={<DownloadUploadContent />}
          />
        </li>
      </Menu>
      <HeaderSecondLayerContainer>
        {editNetworkName ? (
          <NetworkNameEditContainer>
            <div>
              <label htmlFor="network name">Change Network Name</label>
              <Input
                $marginBottom="0"
                value={networkName}
                id="network name"
                type="text"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNetworkName(event.target.value)
                }
              />
            </div>
            <Button onClick={() => setEditNetworkName(false)}>Save</Button>
          </NetworkNameEditContainer>
        ) : (
          <NetworkName onClick={() => setEditNetworkName(true)}>
            {networkName}
          </NetworkName>
        )}
        <Button onClick={() => createNewNetwork()}>New Network</Button>
        <Button
          onDragStart={(event: DragEvent<HTMLButtonElement>) =>
            onDragStart(event, "default")
          }
          draggable
          onClick={addNode} // for touch screens
        >
          Add Node
        </Button>
        <span>
          Study Mode:{" "}
          <Button onClick={() => setStudyMode(!studyMode)}>
            {studyMode ? "ON" : "OFF"}
          </Button>
        </span>
      </HeaderSecondLayerContainer>
    </HeaderContainer>
  );
};
