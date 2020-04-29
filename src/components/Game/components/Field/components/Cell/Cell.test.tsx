import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import { Cell } from "./Cell";

describe("Cell", () => {
  it("empty cell test", () => {
    expect(
      renderer
        .create(
          <Cell isAlive={false} x={0} y={0} cellSize={50} onClick={jest.fn()} />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("filled cell test", () => {
    expect(
      renderer
        .create(
          <Cell isAlive={true} x={0} y={0} cellSize={50} onClick={jest.fn()} />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
  it("check prop decideWhichAnimation value 1", () => {
    const wrapper = mount(
      <Cell isAlive={false} x={0} y={0} cellSize={50} onClick={jest.fn()} />
    );
    expect(wrapper.state("decideWhichAnimation")).toEqual(false);
  });
  it("check prop decideWhichAnimation value 2", () => {
    const wrapper = mount(
      <Cell isAlive={false} x={0} y={0} cellSize={50} onClick={jest.fn()} />
    );
    wrapper.setProps({ isAlive: true });
    expect(wrapper.state("decideWhichAnimation")).toEqual(true);
  });
});
