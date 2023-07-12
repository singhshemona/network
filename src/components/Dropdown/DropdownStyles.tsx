import styled from 'styled-components';

type TriggerProps = {
  isOpen: boolean;
}

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

export const Trigger = styled.button<TriggerProps>`
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-bottom: ${({isOpen}) => isOpen && 0};
  border-radius: ${props => props.theme.borderRadius.default};
  border-bottom-left-radius: ${({isOpen}) => isOpen && 0};
  border-bottom-right-radius: ${({isOpen}) => isOpen && 0};
  background: ${props => props.theme.colors.cream};
  color: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  font-weight: ${props => props.theme.fontWeight.bold};
`;