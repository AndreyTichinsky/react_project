import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import { dispatch } from "@/redux";
import { MenuComponent } from "./Menu";

export default {
  title: "Menu",
  decorators: [withKnobs],
};

export const enabledMenu = () => {
  return (
    <MenuComponent
      initialPercent={number("initialPercent", 0)}
      xSize={number("xSize", 10)}
      ySize={number("ySize", 10)}
      isDisabled={false}
      dispatch={dispatch}
    />
  );
};
export const disabledMenu = () => {
  return (
    <MenuComponent
      initialPercent={number("initialPercent", 0)}
      xSize={number("xSize", 10)}
      ySize={number("ySize", 10)}
      isDisabled={true}
      dispatch={dispatch}
    />
  );
};
