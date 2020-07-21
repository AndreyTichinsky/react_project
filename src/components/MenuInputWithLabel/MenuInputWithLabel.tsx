import React, { FC } from "react";
import { AppDispatch } from "@/redux/store";
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
  action: string;
}

export const MenuInputWithLabel: FC<
  MenuInputWithLabelProps & { dispatch: AppDispatch }
> = ({ labelText, action, value, dispatch, ...props }) => {
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
          onChange={(ev) =>
            dispatch({ type: action, payload: Number(ev.target.value) })
          }
        />
      </label>
    </fieldset>
  );
};
