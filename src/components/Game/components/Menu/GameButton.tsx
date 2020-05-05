import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface GameButtonProps {
  className: string;
  eventName: string;
  buttonText: string;
  onChange: (ev: React.FormEvent, eventName: string) => void;
}

const baseMenuButton = css`
  width: auto;
`;

export const GameButton: React.FC<GameButtonProps> = ({
  className,
  onChange,
  eventName,
  buttonText,
}) => {
  return (
    <button
      className={className}
      onClick={(ev) => onChange(ev, eventName)}
      css={css`
        ${baseMenuButton};
      `}
    >
      {buttonText}
    </button>
  );
};
