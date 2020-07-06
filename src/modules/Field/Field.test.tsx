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
            <FieldComponent field={[0, 0, 0, 0]} xSize={2} ySize={2} />
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
            <FieldComponent field={[1, 0, 0, 1]} xSize={2} ySize={2} />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
