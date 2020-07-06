import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import { Cell } from "./Cell";

export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const emptyCell = () => {
  return (
    <Provider store={store}>
      <Cell
        isAlive={boolean("isAlive", false)}
        x={number("x", 0)}
        y={number("y", 0)}
        animationSpeed={number("animationSpeed", 500)}
      />
    </Provider>
  );
};
