import React from "react";
import type { HandlerControllerEvent } from "types/menu";
import { GameButton } from "./GameButton";
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

const disabledForm = css`
  color: grey;
`;

export class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props);
  }
  render() {
    return (
      <fieldset disabled={this.props.isDisabled}>
        <form
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            ${this.props.isDisabled ? disabledForm : ""};
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
              value={this.props.xSize}
              onChange={(ev) =>
                this.props.eventHandler(ev, "handleXSizeChange")
              }
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
              value={this.props.ySize}
              onChange={(ev) =>
                this.props.eventHandler(ev, "handleYSizeChange")
              }
            />
          </label>
          <GameButton
            className="update_button"
            onChange={this.props.eventHandler.bind(this)}
            eventName="handleUpdate"
            buttonText="Update size"
          />
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
              value={this.props.initialPercent}
              onChange={(ev) =>
                this.props.eventHandler(ev, "handleFilledPercent")
              }
            />
          </label>
          <GameButton
            className="generator_button"
            onChange={this.props.eventHandler}
            eventName="handleGenerator"
            buttonText="Random generation"
          />
          <GameButton
            className="reset_button"
            onChange={this.props.eventHandler}
            eventName="handleReset"
            buttonText="Reset"
          />
        </form>
      </fieldset>
    );
  }
}
