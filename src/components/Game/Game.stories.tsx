import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { Field } from "./components";
import { Game } from "./Game";

export default {
  title: "Game",
  decorators: [withKnobs],
};

export const instanceGame = () => (
  <Game
    xSize={10}
    ySize={10}
    cellSize={number("cellSize", 50)}
    fieldComponent={Field}
  />
);
