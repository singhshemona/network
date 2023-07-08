import React, { useState } from 'react';

type DropdownProps = {
  trigger: string;
  children: JSX.Element;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={(prevState) => setIsOpen(!prevState)}>{trigger} {isOpen ? '+' : '-'}</button>
      {isOpen &&
        <div>
          {children}
        </div>
      }
    </>
  );
}
