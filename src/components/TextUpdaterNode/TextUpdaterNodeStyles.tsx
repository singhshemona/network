import styled from "styled-components";
import { NodeAndEdgeContainer } from "../../styles/GeneralStyles";
import ReactQuill from "react-quill";

export const NodeContainer = styled(NodeAndEdgeContainer)`
  max-width: 350px;
  min-width: 280px;
`;

export const Prompt = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  margin: 0;
  font-size: 18px;
`;

export const Answer = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
`;

export const ReactQuillStyled = styled(ReactQuill)`
  background-color: #fefcf6;
  margin-bottom: 12px;
`;
