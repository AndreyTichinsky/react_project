import React from "react";
import { withKnobs, number, boolean, text } from "@storybook/addon-knobs";
import { Field, Menu, Entrance } from "./components";
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
    menuComponent={Menu}
    entranceComponent={Entrance}
    updateSpeed={text("updateSpeed", "slow")}
    gameInProgress={boolean("gameInProgress", false)}
    nameIsSubmited={boolean("nameIsSubmited", false)}
  />
);
