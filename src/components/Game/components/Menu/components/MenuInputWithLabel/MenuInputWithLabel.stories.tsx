import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import { MenuInputWithLabel } from "./MenuInputWithLabel";

export default {
  title: "MenuInputWithLabel",
  decorators: [withKnobs],
};

const onChange = action("change (element)");

export const instanceMenuInputWithLabel = () => (
  <MenuInputWithLabel
    labelText="label"
    className="input"
    name="MenuInputWithLabel"
    type="number"
    min="0"
    max="100"
    value={number("value", 10)}
    eventName="changeInput"
    eventHandler={(event, eventName) => {
      onChange(eventName);
    }}
  />
);
