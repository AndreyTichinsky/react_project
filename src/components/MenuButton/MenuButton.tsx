import React, { FC } from "react";
import { AppDispatch } from "@/redux/store";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { menuButton } from "./MenuButton.styled";

interface MenuButtonProps {
  className: string;
  buttonText: string;
  action: string;
}

export const MenuButton: FC<MenuButtonProps & { dispatch: AppDispatch }> = ({
  className,
  action,
  buttonText,
  dispatch,
}) => {
  return (
    <button
      className={className}
      onClick={(ev) => {
        ev.preventDefault();
        dispatch({ type: action });
      }}
      css={menuButton}
    >
      {buttonText}
    </button>
  );
};
