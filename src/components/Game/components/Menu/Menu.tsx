import React from "react";
import type { HandlerControllerEvent } from "types/menu";
import type { HandlerNameType } from "types/game";
import { MenuButton } from "./components/MenuButton";
import { MenuInputWithLabel } from "./components/MenuInputWithLabel";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuForm, disabledForm, MenuWrapper } from "./Menu.styled";

export interface MenuProps {
  initialPercent: number;
  xSize: number;
  ySize: number;
  isDisabled: boolean;
  eventHandler: (event: HandlerControllerEvent, name: HandlerNameType) => void;
}

export class Menu extends React.Component<MenuProps> {
  constructor(props: MenuProps) {
    super(props);
  }
  render() {
    return (
      <MenuWrapper>
        <fieldset disabled={this.props.isDisabled}>
          <form
            css={css`
              ${menuForm};
              ${this.props.isDisabled ? disabledForm : ""};
            `}
          >
            <MenuInputWithLabel
              labelText="xSize"
              className="xSize_input"
              name="xSize"
              type="number"
              min="0"
              max="50"
              value={this.props.xSize}
              eventName="handleXSizeChange"
              eventHandler={this.props.eventHandler}
            />
            <MenuInputWithLabel
              labelText="ySize"
              className="ySize_input"
              name="ySize"
              type="number"
              min="0"
              max="50"
              value={this.props.ySize}
              eventName="handleYSizeChange"
              eventHandler={this.props.eventHandler}
            />
            <MenuInputWithLabel
              labelText="Filled %"
              className="filled_percent"
              name="filledPercent"
              type="number"
              min="0"
              max="100"
              value={this.props.initialPercent}
              eventName="handleFilledPercent"
              eventHandler={this.props.eventHandler}
            />
            <MenuButton
              className="generator_button"
              eventHandler={this.props.eventHandler}
              eventName="handleGenerator"
              buttonText="Random generation"
            />
            <MenuButton
              className="reset_button"
              eventHandler={this.props.eventHandler}
              eventName="handleReset"
              buttonText="Reset"
            />
          </form>
        </fieldset>
      </MenuWrapper>
    );
  }
}
