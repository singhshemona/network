import styled from "styled-components";

type TriggerProps = {
  $isOpen: boolean;
};

export const DropdownContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.default};
  height: fit-content;
  position: relative;
`;

export const DropdownContents = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: ${({ theme }) => theme.colors.cream};
  padding: 6px 10px;
  max-height: 250px;
  overflow: scroll;
  min-width: 340px;
  position: absolute;
`;

export const Trigger = styled.button<TriggerProps>`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-bottom: ${({ $isOpen }) => $isOpen && 0};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border-bottom-left-radius: ${({ $isOpen }) => $isOpen && 0};
  border-bottom-right-radius: ${({ $isOpen }) => $isOpen && 0};
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  padding: 6px 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
