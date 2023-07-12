import styled from 'styled-components';

export const DropdownContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius.default};
  height: fit-content;
  position: relative;
`;

export const DropdownContents = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.theme.colors.cream};
  padding: 6px 10px;
  max-height: 250px;
  overflow: scroll;
  min-width: 340px;
  position: absolute;
`;

export const Trigger = styled.button`
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.default};
  background: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  font-weight: ${props => props.theme.fontWeight.bold};
`;