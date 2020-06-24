import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, object, number } from "@storybook/addon-knobs";
import { FieldComponent } from "./Field";

export default {
  title: "Field",
  decorators: [withKnobs],
};
const elementClicked = action("Cell clicked (element)");

export const emptyField = () => {
  return (
    <FieldComponent
      cellSize={number("cellSize", 50)}
      field={object("field", [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ])}
    />
  );
};