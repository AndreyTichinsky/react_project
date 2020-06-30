import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { withKnobs, number, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { Game } from "./Game";

export default {
  title: "Game",
  decorators: [withKnobs],
};

export const instanceGame = () => (
  <Provider store={store}>
    <Game
      xSize={number("xSize", 10)}
      ySize={number("ySize", 10)}
      cellSize={number("cellSize", 50)}
      updateSpeed={text("updateSpeed", "slow")}
      gameInProgress={boolean("gameInProgress", false)}
      nameIsSubmited={boolean("nameIsSubmited", false)}
      username={"Guest"}
      onLogout={action("Logged out")}
    />
  </Provider>
);
