import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Entrance } from "./Entrance";

export default {
  title: "Entrance",
  decorators: [withKnobs],
};

export const instanceEntrance = () => (
  <Entrance
    username={text("username", "Guest")}
    eventHandler={action("change")}
  />
);
