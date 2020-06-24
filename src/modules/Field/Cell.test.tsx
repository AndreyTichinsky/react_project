import React from "react";
import renderer from "react-test-renderer";
import { Cell } from "./Cell";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

describe("Cell", () => {
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
              cellSize={50}
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
              cellSize={50}
              dispatch={jest.fn()}
            />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
