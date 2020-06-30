import React, { FC } from "react";
import { MenuProps } from "./Menu.interface";
import { MenuButton } from "@/components/MenuButton";
import { MenuInputWithLabel } from "@/components/MenuInputWithLabel";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuForm, disabledForm, MenuWrapper } from "./Menu.styled";
import { connect } from "react-redux";
import { State } from "@/redux/store";

const mapStateToProps = (state: State) => ({
  initialPercent: state.game.initialPercent,
  xSize: state.game.xSize,
  ySize: state.game.ySize,
  isDisabled: state.game.gameInProgress,
});

export const MenuComponent: FC<MenuProps> = (props) => {
  return (
    <MenuWrapper>
      <fieldset disabled={props.isDisabled}>
        <form
          css={css`
            ${menuForm};
            ${props.isDisabled ? disabledForm : ""};
          `}
        >
          <MenuInputWithLabel
            labelText="xSize"
            className="xSize_input"
            name="xSize"
            type="number"
            min="0"
            max="50"
            value={props.xSize}
            eventName="handleXSizeChange"
            eventHandler={props.eventHandler}
          />
          <MenuInputWithLabel
            labelText="ySize"
            className="ySize_input"
            name="ySize"
            type="number"
            min="0"
            max="50"
            value={props.ySize}
            eventName="handleYSizeChange"
            eventHandler={props.eventHandler}
          />
          <MenuInputWithLabel
            labelText="Filled %"
            className="filled_percent"
            name="filledPercent"
            type="number"
            min="0"
            max="100"
            value={props.initialPercent}
            eventName="handleFilledPercent"
            eventHandler={props.eventHandler}
          />
          <MenuButton
            className="generator_button"
            eventHandler={props.eventHandler}
            eventName="handleGenerator"
            buttonText="Random generation"
          />
          <MenuButton
            className="reset_button"
            eventHandler={props.eventHandler}
            eventName="handleReset"
            buttonText="Reset"
          />
        </form>
      </fieldset>
    </MenuWrapper>
  );
};

export const Menu = connect(mapStateToProps)(MenuComponent);
