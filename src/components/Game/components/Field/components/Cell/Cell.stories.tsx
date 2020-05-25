import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import { Cell } from "./Cell";

export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const emptyCell = () => {
  return (
    <Cell
      isAlive={boolean("isAlive", false)}
      x={number("x", 0)}
      y={number("y", 0)}
      cellSize={number("cellSize", 25)}
      onClick={action("Cell clicked")}
      animationSpeed={number("animationSpeed", 500)}
    />
  );
};
