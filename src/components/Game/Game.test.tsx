import React from "react";
import { mount } from "enzyme";

import { Game } from "./Game";

describe("Game", () => {
  const FakeComponent: React.FC<{
    field: boolean[][];
    cellSize: number;
    onClick: (x: number, y: number) => void;
  }> = () => null;

  it("check Game Props", () => {
    const wrapper = mount(
      <Game
        fieldComponent={FakeComponent}
        xSize={2}
        ySize={2}
        cellSize={50}
        updateSpeed={500}
        gameInProgress={false}
      />
    );
    expect(wrapper.props()).toEqual({
      xSize: 2,
      ySize: 2,
      cellSize: 50,
      updateSpeed: 500,
      gameInProgress: false,
      fieldComponent: FakeComponent,
    });
  });

  it("update props", () => {
    const wrapper = mount(
      <Game
        fieldComponent={FakeComponent}
        xSize={2}
        ySize={2}
        cellSize={50}
        updateSpeed={500}
        gameInProgress={false}
      />
    );
    wrapper.setProps({
      xSize: 5,
      ySize: 5,
    });
    expect(wrapper.props()).toEqual({
      xSize: 5,
      ySize: 5,
      cellSize: 50,
      updateSpeed: 500,
      gameInProgress: false,
      fieldComponent: FakeComponent,
    });
  });

  it("game in progress button text", () => {
    const wrapper = mount(
      <Game
        fieldComponent={FakeComponent}
        xSize={2}
        ySize={2}
        cellSize={50}
        updateSpeed={500}
        gameInProgress={false}
      />
    );
    wrapper.setProps({
      gameInProgress: true,
    });
    expect(wrapper.find("button.progress_button").text()).toEqual("Stop");
  });
});
