import styled from "styled-components";
import { NodeAndEdgeContainer } from "../../styles/GeneralStyles";

type EdgeContainerProps = {
  labelX: number;
  labelY: number;
};

export const EdgeContainer = styled(NodeAndEdgeContainer)<EdgeContainerProps>`
  transform: ${({ labelX, labelY }) =>
    `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`};
  max-width: 160px;
  position: absolute;
  pointer-events: all;
`;

export const Textarea = styled.textarea`
  font-family: ${(props) => props.theme.fonts.default};
  margin-bottom: 6px;
  padding: 6px;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  font-size: 14px;
  pointer-events: all;
`;
