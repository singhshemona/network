import styled from 'styled-components';
import { NodeColor } from '../../types/shared-types';

type NodeContainerProps = { 
  colors: NodeColor;
}

export const NodeContainer = styled.div<NodeContainerProps>`
  color: ${props => props.theme.colors.darkGray};
  border: ${({colors}) => `1px solid ${colors.dark}`};
  background-color: ${({colors}) => colors.light};
  border-radius: 4px;
  max-width: 280px;
  padding: 12px;
`;

export const Prompt = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
  margin: 0;
`;

export const Answer = styled.p`
  margin-bottom: 0;
  margin-top: 10px;
`;