import React from "react";
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
  eventName: string;
  eventHandler: (ev: React.FormEvent, eventName: string) => void;
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
      <label
        css={css`
          ${baseLabel};
        `}
      >
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
