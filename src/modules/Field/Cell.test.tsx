import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { configureStore } from "@reduxjs/toolkit";

import { preloadedState, reducer } from "@/redux";
import { Cell } from "./Cell";

describe("Cell", () => {
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
  it("empty cell test", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Cell
              animationSpeed={500}
              isAlive={false}
              x={0}
              y={0}
              idx={0}
              dispatch={jest.fn()}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("filled cell test", () => {
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Cell
              animationSpeed={500}
              isAlive={true}
              x={0}
              y={0}
              idx={0}
              dispatch={jest.fn()}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
