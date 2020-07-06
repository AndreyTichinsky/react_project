import React from "react";
import renderer from "react-test-renderer";
import { Cell } from "./Cell";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { preloadedState } from "@/redux/store";
import { reducer } from "@/redux/reducer";

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
