import styled from 'styled-components';

export const HeaderContainer = styled.header`
  color: ${props => props.theme.colors.lightGray};
`;

export const Menu = styled.menu`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
  padding: 14px;
`;

export const Title = styled.h1`
  font-weight: ${props => props.theme.fontWeight.bold};
  font-size: 24px;
  margin: 0;
`;

export const NetworkName = styled.h2`
  cursor: pointer;
`