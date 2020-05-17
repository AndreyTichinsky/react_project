import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { MenuButton } from "./MenuButton";

export default {
  title: "MenuButton",
  decorators: [withKnobs],
};

const onSubmit = action("submit (element)");

export const instanceMenuButton = () => (
  <MenuButton
    className="button"
    eventName="buttonClick"
    buttonText={"MenuButton"}
    eventHandler={(event, eventName) => {
      onSubmit(eventName);
      event.preventDefault();
    }}
  />
);
