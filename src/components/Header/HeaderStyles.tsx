import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.lightGray};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Menu = styled.menu`
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  list-style-type: none;
  margin: 0;
  display: flex;
  gap: 20px;
  padding: 14px;
`;

export const Title = styled.h1`
  font-weight: ${props => props.theme.fontWeight.bold};
  font-size: 20px;
  margin: 0;
`;

export const NetworkName = styled.h2`
  cursor: pointer;
  margin: 0;
`

export const HeaderSecondLayerContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 14px;
`;

export const Link = styled.a`
  color: ${props => props.theme.colors.lightGray};
`