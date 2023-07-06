import styled from 'styled-components';
import { NodeColor } from '../../types/types';

type NodeContainerProps = { 
  colors: NodeColor
}

export const NodeContainer = styled.div<NodeContainerProps>`
  color: ${props => props.theme.colors.darkGray};
  border: ${({colors}) => `1px solid ${colors.dark}`};
  background-color: ${({colors}) => colors.light};
`;

export const Prompt = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
`;