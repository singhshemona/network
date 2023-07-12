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
`;

export const NodeAndEdgeContainer = styled.div<NodeAndEdgeContainerProps>`
  border-radius: ${props => props.theme.borderRadius.default};
  padding: 12px;
  color: ${props => props.theme.colors.darkGray};
  border: ${({colors}) => `1px solid ${colors.dark}`};
  background-color: ${({colors}) => colors.light};
`;

export const Button = styled.button`
  color: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  border-radius: ${props => props.theme.borderRadius.default};
  background: ${props => props.theme.colors.cream};
  border: 1px solid ${props => props.theme.colors.lightGray};
  &:hover {
    background: ${props => props.theme.colors.hoverGray};
    transition: ease .3s;
  }
`;

export const Input = styled.input`
  padding: 6px;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.colors.lightGray};
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-weight: ${props => props.theme.fontWeight.bold};
  display: block;
  margin-bottom: 6px;
`;

export const Textarea = styled.textarea`
  font-family: ${props => props.theme.fonts.default};
  margin-bottom: 6px;
  padding: 6px;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  font-size: 14px;
`;
