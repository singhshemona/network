import styled from 'styled-components';
import { NodeAndEdgeContainer } from '../../styles/GeneralStyles';

export const NodeContainer = styled(NodeAndEdgeContainer)`
  max-width: 280px;
`;

export const Prompt = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
  margin: 0;
`;

export const Answer = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
`;