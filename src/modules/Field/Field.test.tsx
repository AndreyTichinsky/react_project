import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { preloadedState, reducer, State } from "@/redux";
import { FieldComponent } from "./Field";

describe("Field", () => {
  let store: EnhancedStore<State>;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
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
