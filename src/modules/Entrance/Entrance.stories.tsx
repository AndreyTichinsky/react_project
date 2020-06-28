import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

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
