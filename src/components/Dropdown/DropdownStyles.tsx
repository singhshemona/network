import styled from 'styled-components';

export const DropdownContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.default};
  height: fit-content;
`;

export const DropdownContents = styled.div`
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  padding: 6px 10px;
`;

export const Trigger = styled.button`
  border: 0;
  border-radius: ${props => props.theme.borderRadius.default};
  background: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  font-weight: ${props => props.theme.fontWeight.bold};
`;