import React from "react";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { Field } from "./components";
import { Game } from "./Game";

export default {
  title: "Game",
  decorators: [withKnobs],
};

export const instanceGame = () => (
  <Game
    xSize={number("xSize", 10)}
    ySize={number("ySize", 10)}
    cellSize={number("cellSize", 50)}
    fieldComponent={Field}
    updateSpeed={number("updateSpeed", 500)}
    gameInProgress={boolean("gameInProgress", false)}
  />
);
