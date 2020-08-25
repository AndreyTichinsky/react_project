import React from "react";
import { Provider } from "react-redux";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import "styles/global.scss";
import { store } from "@/redux";
import { Entrance } from "./Entrance";

export default {
  title: "Entrance",
  decorators: [withKnobs],
};

export const instanceEntrance = () => (
  <Provider store={store}>
    <Entrance submitHandler={action("onSubmit")} />
  </Provider>
);
