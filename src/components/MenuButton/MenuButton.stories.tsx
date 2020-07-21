import React from "react";
import { dispatch } from "@/redux/store";
import { withKnobs } from "@storybook/addon-knobs";

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
