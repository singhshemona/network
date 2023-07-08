import styled, { createGlobalStyle } from 'styled-components';
import { NodeColor } from '../types/shared-types';

type NodeAndEdgeContainerProps = { 
  colors: NodeColor;
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
export const AppContainer = styled.div`
  background: ${props => props.theme.colors.cream};
  font-family: ${props => props.theme.fonts.default};
`;

export const ReactFlowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  border-top: 1px solid ${props => props.theme.colors.lightGray}
`;

export const NodeAndEdgeContainer = styled.div<NodeAndEdgeContainerProps>`
  border-radius: 4px;
  padding: 12px;
  color: ${props => props.theme.colors.darkGray};
  border: ${({colors}) => `1px solid ${colors.dark}`};
  background-color: ${({colors}) => colors.light};
`;