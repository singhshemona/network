import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.lightGray};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Menu = styled.menu`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  list-style-type: none;
  margin: 0;
  display: flex;
  gap: 20px;
  padding: 14px;
`;

export const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 20px;
  margin: 0;
`;

export const NetworkName = styled.h2`
  cursor: pointer;
  margin: 0;
`;

export const HeaderSecondLayerContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 14px;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.lightGray};
`;

export const NetworkNameEditContainer = styled.div`
  max-width: 250px;
  display: flex;
  align-items: end;
  gap: 10px;
`;
