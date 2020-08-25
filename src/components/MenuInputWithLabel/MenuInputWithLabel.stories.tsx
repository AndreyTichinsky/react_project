import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";

import { dispatch } from "@/redux";
import { MenuInputWithLabel } from "./MenuInputWithLabel";

export default {
  title: "MenuInputWithLabel",
  decorators: [withKnobs],
};

export const instanceMenuInputWithLabel = () => (
  <MenuInputWithLabel
    labelText="label"
    className="input"
    name="MenuInputWithLabel"
    type="number"
    min="0"
    max="100"
    value={number("value", 10)}
    dispatch={dispatch}
    action="dummy"
  />
);
