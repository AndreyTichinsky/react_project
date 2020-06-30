import React from "react";
import renderer from "react-test-renderer";
import { FieldComponent } from "./Field";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { preloadedState } from "@/redux/store";
import { reducer } from "@/redux/reducer";

describe("Field", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
  });
  afterEach(() => {
    store = null;
  });
  it("empty Field test", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <FieldComponent
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
            <FieldComponent
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
