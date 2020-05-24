import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { MenuButton } from "./MenuButton";

export default {
  title: "MenuButton",
  decorators: [withKnobs],
};

export const instanceMenuButton = () => (
  <MenuButton
    className="button"
    eventName="handleGenerator"
    buttonText={"MenuButton"}
    eventHandler={action("on submit")}
  />
);
