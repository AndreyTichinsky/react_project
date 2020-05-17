import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import { Cell } from "./Cell";

describe("Cell", () => {
  it("empty cell test", () => {
    expect(
      renderer
        .create(
          <Cell
            animationSpeed={500}
            isAlive={false}
            x={0}
            y={0}
            cellSize={50}
            onClick={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("filled cell test", () => {
    expect(
      renderer
        .create(
          <Cell
            animationSpeed={500}
            isAlive={true}
            x={0}
            y={0}
            cellSize={50}
            onClick={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
