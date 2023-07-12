import styled from "styled-components";
import { NodeAndEdgeContainer } from "../../styles/GeneralStyles";

type EdgeContainerProps = { 
  labelX: number;
  labelY: number;
}

export const EdgeContainer = styled(NodeAndEdgeContainer)<EdgeContainerProps>`
  max-width: 160px;
  position: absolute;
  transform: ${({labelX, labelY}) => `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`};
  pointer-events: all;
`;