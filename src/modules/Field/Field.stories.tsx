import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { withKnobs } from "@storybook/addon-knobs";
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
