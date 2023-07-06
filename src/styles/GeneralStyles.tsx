import styled, { createGlobalStyle } from 'styled-components';

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