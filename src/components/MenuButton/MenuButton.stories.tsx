import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import "styles/global.scss";
import { dispatch } from "@/redux";
import { MenuButton } from "./MenuButton";

export default {
  title: "MenuButton",
  decorators: [withKnobs],
};

export const instanceMenuButton = () => (
  <MenuButton
    className="button"
    buttonText={"MenuButton"}
    action="dummy action"
    dispatch={dispatch}
  />
);
