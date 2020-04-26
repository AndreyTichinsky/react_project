import React from "react";
import { shallow } from "enzyme";

import { Game } from "./Game";

describe("Game", () => {
  const FakeComponent: React.FC<{
    field: boolean[][];
    cellSize: number;
    onClick: (x: number, y: number) => void;
  }> = () => null;

  it("check Field Props", () => {
    const field = shallow(
      <Game fieldComponent={FakeComponent} xSize={2} ySize={2} cellSize={50} />
    ).find(FakeComponent);
    expect(field.props()).toEqual({
      field: [
        [false, false],
        [false, false],
      ],
      onClick: expect.any(Function),
      cellSize: 50,
    });
  });

  it("field update after onClick", () => {
    const wrapper = shallow(
      <Game fieldComponent={FakeComponent} xSize={3} ySize={3} cellSize={50} />
    );
    expect(wrapper.find(FakeComponent).props()).toEqual({
      field: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
      onClick: expect.any(Function),
      cellSize: 50,
    });
    wrapper.find(FakeComponent).props().onClick(0, 0);
    wrapper.update();
    expect(wrapper.find(FakeComponent).props()).toEqual({
      field: [
        [true, false, false],
        [false, false, false],
        [false, false, false],
      ],
      onClick: expect.any(Function),
      cellSize: 50,
    });
    wrapper.find(FakeComponent).props().onClick(2, 1);
    wrapper.update();
    expect(wrapper.find(FakeComponent).props()).toEqual({
      field: [
        [true, false, false],
        [false, false, true],
        [false, false, false],
      ],
      onClick: expect.any(Function),
      cellSize: 50,
    });
  });
});
