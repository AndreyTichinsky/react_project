import React from "react";
import renderer from "react-test-renderer";
import { Field } from "./Field";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

describe("Field", () => {
  it("empty Field test", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Field
              field={[
                [false, false],
                [false, false],
              ]}
              cellSize={50}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("partial filled cell test", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Field
              field={[
                [true, false],
                [false, true],
              ]}
              cellSize={50}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
