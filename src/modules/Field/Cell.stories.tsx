import React from "react";
import { Provider } from "react-redux";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import { store } from "@/redux";
import { Cell } from "./Cell";

export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const emptyCell = () => {
  return (
    <Provider store={store}>
      <Cell x={number("x", 0)} y={number("y", 0)} idx={0} />
    </Provider>
  );
};
