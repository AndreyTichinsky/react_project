import React from "react";
import renderer from "react-test-renderer";
import { Field } from "./Field";

describe("Field", () => {
  it("empty Field test", () => {
    expect(
      renderer
        .create(
          <Field
            field={[
              [false, false],
              [false, false],
            ]}
            cellSize={50}
            onClick={jest.fn()}
            animationSpeed={500}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("partial filled cell test", () => {
    expect(
      renderer
        .create(
          <Field
            field={[
              [true, false],
              [false, true],
            ]}
            cellSize={50}
            onClick={jest.fn()}
            animationSpeed={500}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
