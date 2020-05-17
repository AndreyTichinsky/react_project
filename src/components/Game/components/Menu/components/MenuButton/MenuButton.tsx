import React from "react";
import type { HandlerNameType } from "types/game";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuButton } from "./MenuButton.styled";

interface MenuButtonProps {
  className: string;
  eventName: HandlerNameType;
  buttonText: string;
  eventHandler: (ev: React.FormEvent, eventName: HandlerNameType) => void;
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
      css={menuButton}
    >
      {buttonText}
    </button>
  );
};
