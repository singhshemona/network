import React, { useState, useEffect, useRef } from "react";
import { DropdownContainer, DropdownContents, Trigger } from "./DropdownStyles";

type DropdownProps = {
  trigger: string;
  contents: JSX.Element;
};

export const Dropdown = ({ trigger, contents }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <DropdownContainer ref={ref}>
      <Trigger
        $isOpen={isOpen}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        {trigger} {isOpen ? "-" : "+"}{" "}
      </Trigger>
      {isOpen && <DropdownContents>{contents}</DropdownContents>}
    </DropdownContainer>
  );
};
