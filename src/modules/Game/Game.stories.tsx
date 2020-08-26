import React from "react";
import { Provider } from "react-redux";
import { withKnobs, number, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import "styles/global.scss";
import { store } from "@/redux";
import { Game } from "./Game";

export default {
  title: "Game",
  decorators: [withKnobs],
};

export const instanceGame = () => (
  <Provider store={store}>
    <Game onLogout={action("Logged out")} />
  </Provider>
);
