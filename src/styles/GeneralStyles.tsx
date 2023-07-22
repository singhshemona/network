import styled, { createGlobalStyle } from "styled-components";
import { NodeColor } from "../types/shared-types";

type NodeAndEdgeContainerProps = {
  $colors: NodeColor;
};

type InputProps = {
  $marginBottom?: string;
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
export const AppContainer = styled.div`
  background: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.default};
`;

// height here is calculated from subtracting the height of the header from 100vh
export const ReactFlowContainer = styled.div`
  width: 100vw;
  height: 85.2vh;
`;

export const NodeAndEdgeContainer = styled.div<NodeAndEdgeContainerProps>`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.colors.darkGray};
  border: ${({ $colors }) => `1px solid ${$colors.dark}`};
  background-color: ${({ $colors }) => $colors.light};
`;

export const Button = styled.button`
  color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background: ${({ theme }) => theme.colors.cream};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverGray};
    transition: ease 0.3s;
  }
`;

export const Input = styled.input<InputProps>`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.default};
  padding: 8px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  margin-bottom: ${({ $marginBottom }) =>
    $marginBottom ? $marginBottom : "12px"};
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: block;
  margin-bottom: 6px;
`;

export const DefaultContent = styled.div`
  padding: ${({ theme }) => theme.padding.card};
  cursor: pointer;
`;

export const Form = styled.form`
  padding: ${({ theme }) => theme.padding.card};
`;
