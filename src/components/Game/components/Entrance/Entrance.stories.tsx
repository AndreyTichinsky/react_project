import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Entrance } from "./Entrance";

export default {
  title: "Entrance",
  decorators: [withKnobs],
};

const onChange = action("change (element)");
const onSubmit = action("submit (element)");

export const instanceEntrance = () => (
  <Entrance
    username={text("username", "Guest")}
    eventHandler={(event, eventName) => {
      switch (eventName) {
        case "handleUsername":
          onChange(eventName);
          break;
        case "submitUsername":
          onSubmit(eventName);
          event.preventDefault();
          break;
      }
    }}
  />
);
