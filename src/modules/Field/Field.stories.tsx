import React from "react";
import { Provider } from "react-redux";
import { withKnobs } from "@storybook/addon-knobs";

import { store } from "@/redux";
import { Field } from "./Field";

export default {
  title: "Field",
  decorators: [withKnobs],
};

export const emptyField = () => {
  return (
    <Provider store={store}>
      <Field />
    </Provider>
  );
};
