import React, { FC } from "react";
import { MenuProps } from "./Menu.interface";
import { MenuButton } from "@/components/MenuButton";
import { MenuInputWithLabel } from "@/components/MenuInputWithLabel";
import { AppDispatch } from "@/redux/store";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuForm, disabledForm, MenuWrapper } from "./Menu.styled";
import { connect } from "react-redux";
import { State } from "@/redux/store";
import { actions } from "@/modules/Game/reducer";

const mapStateToProps = (state: State) => ({
  initialPercent: state.game.initialPercent,
  xSize: state.game.xSize,
  ySize: state.game.ySize,
  isDisabled: state.game.gameInProgress,
});

export const MenuComponent: FC<MenuProps & { dispatch: AppDispatch }> = (
  props
) => {
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
            type="range"
            min="0"
            max="100"
            value={props.xSize}
            dispatch={props.dispatch}
            action={actions.setXSize.type}
          />
          <MenuInputWithLabel
            labelText="ySize"
            className="ySize_input"
            name="ySize"
            type="range"
            min="0"
            max="50"
            value={props.ySize}
            dispatch={props.dispatch}
            action={actions.setYSize.type}
          />
          <MenuInputWithLabel
            labelText="Filled %"
            className="filled_percent"
            name="filledPercent"
            type="number"
            min="0"
            max="100"
            value={props.initialPercent}
            dispatch={props.dispatch}
            action={actions.setInitialPercent.type}
          />
          <MenuButton
            className="generator_button"
            action={actions.generateRandomField.type}
            dispatch={props.dispatch}
            buttonText="Random generation"
          />
          <MenuButton
            className="reset_button"
            action={actions.reset.type}
            dispatch={props.dispatch}
            buttonText="Reset"
          />
        </form>
      </fieldset>
    </MenuWrapper>
  );
};

export const Menu = connect(mapStateToProps)(MenuComponent);
