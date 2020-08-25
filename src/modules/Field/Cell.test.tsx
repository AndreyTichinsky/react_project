import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

import { preloadedState, reducer, State } from "@/redux";
import { Cell } from "./Cell";

describe("Cell", () => {
  let store: EnhancedStore<State>;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
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
