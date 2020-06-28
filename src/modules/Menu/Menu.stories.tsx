import React from "react";
import type { HandlerControllerEvent } from "types/menu";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import { MenuComponent } from "./Menu";

export default {
  title: "Menu",
  decorators: [withKnobs],
};

const onChange = action("change (element)");
const onSubmit = action("submit (element)");

const handler = (ev: HandlerControllerEvent, eventName: string) => {
  switch (eventName) {
    case "handleXSizeChange":
    case "handleYSizeChange":
    case "handleFilledPercent":
      onChange(eventName);
      break;
    case "handleGenerator":
    case "handleReset":
      onSubmit(eventName);
      ev.preventDefault();
      break;
  }
};

export const enabledMenu = () => {
  return (
    <MenuComponent
      initialPercent={number("initialPercent", 0)}
      xSize={number("xSize", 10)}
      ySize={number("ySize", 10)}
      eventHandler={handler}
      isDisabled={false}
    />
  );
};
export const disabledMenu = () => {
  return (
    <MenuComponent
      initialPercent={number("initialPercent", 0)}
      xSize={number("xSize", 10)}
      ySize={number("ySize", 10)}
      eventHandler={handler}
      isDisabled={true}
    />
  );
};
