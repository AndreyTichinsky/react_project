import React, { FC, useState, useCallback } from "react";
import type { HandlerControllerEvent } from "types/menu";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface MenuProps {
  initialPercent: number;
  xSize: number;
  ySize: number;
  isDisabled: boolean;
  eventHandler: (event: HandlerControllerEvent, name: string) => void;
}

const baseLabel = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const baseMenuButton = css`
  width: auto;
`;

const disabledForm = css`
  color: grey;
`;

export const Menu: FC<MenuProps> = ({
  initialPercent,
  xSize,
  ySize,
  eventHandler,
  isDisabled,
}) => {
  const [stateInitialPercent, setInitialPercent] = useState(initialPercent);
  const [stateXSize, setXSize] = useState(xSize);
  const [stateYSize, setYSize] = useState(ySize);
  const onChange = useCallback((ev, eventName) => {
    switch (eventName) {
      case "handleXSizeChange":
        setXSize(ev.target.value);
        break;
      case "handleYSizeChange":
        setYSize(ev.target.value);
        break;
      case "handleFilledPercent":
        setInitialPercent(ev.target.value);
        break;
    }
    eventHandler(ev, eventName);
  }, []);
  return (
    <fieldset disabled={isDisabled}>
      <form
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          ${isDisabled ? disabledForm : ""};
        `}
      >
        <label
          css={css`
            ${baseLabel};
          `}
        >
          xSize:
          <input
            className="xSize_input"
            name="xSize"
            type="text"
            value={stateXSize}
            onChange={(ev) => onChange(ev, "handleXSizeChange")}
          />
        </label>
        <label
          css={css`
            ${baseLabel};
          `}
        >
          ySize:
          <input
            className="ySize_input"
            name="ySize"
            type="text"
            value={stateYSize}
            onChange={(ev) => onChange(ev, "handleYSizeChange")}
          />
        </label>
        <button
          className="update_button"
          onClick={(ev) => onChange(ev, "handleUpdate")}
          css={css`
            ${baseMenuButton};
          `}
        >
          Update size
        </button>
        <label
          css={css`
            ${baseLabel};
          `}
        >
          Filled %:
          <input
            className="filled_percent"
            name="filledPercent"
            type="text"
            value={stateInitialPercent}
            onChange={(ev) => onChange(ev, "handleFilledPercent")}
          />
        </label>
        <button
          className="generator_button"
          onClick={(ev) => onChange(ev, "handleGenerator")}
          css={css`
            ${baseMenuButton};
          `}
        >
          Random generation
        </button>
        <button
          className="reset_button"
          onClick={(ev) => onChange(ev, "handleReset")}
          css={css`
            ${baseMenuButton};
          `}
        >
          Reset
        </button>
      </form>
    </fieldset>
  );
};
