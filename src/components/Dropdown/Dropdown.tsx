import React, { useState } from 'react';
import { DropdownContainer, DropdownContents, Trigger } from './DropdownStyles';

type DropdownProps = {
  trigger: string;
  contents: JSX.Element;
}

export const Dropdown = ({ trigger, contents }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      <Trigger isOpen={isOpen} onClick={() => setIsOpen(prevState => !prevState)}>{trigger} {isOpen ? '-' : '+'} </Trigger>
      {isOpen &&
        <DropdownContents>
          {contents}
        </DropdownContents>
      }
    </DropdownContainer>
  );
}
