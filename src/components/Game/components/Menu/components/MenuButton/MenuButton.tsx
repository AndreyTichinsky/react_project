import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuButton } from "./MenuButton.styled";

interface MenuButtonProps {
  className: string;
  eventName: string;
  buttonText: string;
  eventHandler: (ev: React.FormEvent, eventName: string) => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  className,
  eventHandler,
  eventName,
  buttonText,
}) => {
  return (
    <button
      className={className}
      onClick={(ev) => eventHandler(ev, eventName)}
      css={css`
        ${menuButton}
      `}
    >
      {buttonText}
    </button>
  );
};
