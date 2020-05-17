import React from "react";
import type { HandlerNameType } from "types/game";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  baseLabel,
  resetFieldset,
  inputFieldsetStyle,
} from "./MenuInputWithLabel.styled";

interface MenuInputWithLabelProps {
  labelText: string;
  className: string;
  name: string;
  type: string;
  min: string;
  max: string;
  value: number;
  eventName: HandlerNameType;
  eventHandler: (ev: React.FormEvent, eventName: HandlerNameType) => void;
}

export const MenuInputWithLabel: React.FC<MenuInputWithLabelProps> = ({
  labelText,
  eventName,
  eventHandler,
  value,
  ...props
}) => {
  return (
    <fieldset
      css={css`
        ${inputFieldsetStyle}
        ${resetFieldset};
      `}
    >
      <label css={baseLabel}>
        {labelText}:
        <input
          {...props}
          value={Number(value).toString()}
          onChange={(ev) => eventHandler(ev, eventName)}
        />
      </label>
    </fieldset>
  );
};
