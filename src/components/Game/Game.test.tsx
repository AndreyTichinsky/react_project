import React from "react";
import { mount, shallow } from "enzyme";
import { Game } from "./Game";
import { calculatePercentage } from "./GameHelper";
import type { HandlerControllerEvent } from "types/menu";

const fieldFakeComponent: React.FC<{
  field: boolean[][];
  cellSize: number;
  onClick: (x: number, y: number) => void;
}> = () => null;

const menuFakeComponent: React.FC<{
  initialPercent: number;
  xSize: number;
  ySize: number;
  eventHandler: (ev: HandlerControllerEvent, name: string) => void;
}> = () => null;

const entranceFakeComponent: React.FC<{
  username: string;
  eventHandler: (ev: HandlerControllerEvent, name: string) => void;
}> = () => null;

const defaultProps = {
  fieldComponent: fieldFakeComponent,
  menuComponent: menuFakeComponent,
  entranceComponent: entranceFakeComponent,
  xSize: 2,
  ySize: 2,
  cellSize: 50,
  updateSpeed: "slow",
  gameInProgress: false,
  nameIsSubmited: false,
};

describe("Game", () => {
  it("check Game Props", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    expect(wrapper.props()).toEqual({
      xSize: 2,
      ySize: 2,
      cellSize: 50,
      updateSpeed: "slow",
      gameInProgress: false,
      nameIsSubmited: false,
      fieldComponent: fieldFakeComponent,
      menuComponent: menuFakeComponent,
      entranceComponent: entranceFakeComponent,
    });
  });

  it("update props", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper.setProps({
      xSize: 5,
      ySize: 5,
    });
    expect(wrapper.props()).toEqual({
      xSize: 5,
      ySize: 5,
      cellSize: 50,
      updateSpeed: "slow",
      gameInProgress: false,
      nameIsSubmited: false,
      fieldComponent: fieldFakeComponent,
      menuComponent: menuFakeComponent,
      entranceComponent: entranceFakeComponent,
    });
  });

  it("game in progress button text", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper.setProps({
      gameInProgress: true,
    });
    expect(wrapper.find("button.progress_button").text()).toEqual("Stop");
  });

  it("progress button test", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper.find("button.progress_button").simulate("click");
    expect(wrapper.state("gameInProgress")).toBeTruthy;
  });

  it("select speed test", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper
      .find("select.speed_select")
      .simulate("change", { target: { value: "fast" } });
    expect(wrapper.state("updateSpeed")).toEqual("fast");
  });

  const formEvent = {
    preventDefault: (): void => {
      void 0;
    },
  } as React.FormEvent;

  // handlers testing
  it("handleReset test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    wrapper.setState({
      fieldState: [
        [true, true],
        [true, true],
      ],
    });
    wrapper.instance().handleReset(formEvent);
    expect(wrapper.state("fieldState")).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });

  it("handleUpdate test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("xSize")).toBe(2);
    expect(wrapper.state("ySize")).toBe(2);
    wrapper.setState({
      xSize: 4,
      ySize: 4,
    });
    wrapper.instance().handleUpdate(formEvent);
    expect(wrapper.state("fieldState")).toStrictEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
    expect(wrapper.state("xSize")).toEqual(4);
    expect(wrapper.state("ySize")).toEqual(4);
  });

  it("handleProgress test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("gameInProgress")).toBeFalsy();
    wrapper.instance().handleProgress(formEvent);
    expect(wrapper.state("gameInProgress")).toBeTruthy();
  });

  it("handleGenerator test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("xSize")).toBe(2);
    expect(wrapper.state("ySize")).toBe(2);
    expect(wrapper.state("initialPercent")).toBe(0);
    wrapper.setState({
      xSize: 4,
      ySize: 4,
      initialPercent: 50,
    });
    wrapper.instance().handleGenerator(formEvent);
    const testMatrix = wrapper.state("fieldState");
    const percent = calculatePercentage(testMatrix);
    expect(percent).toEqual(50);
    expect(testMatrix.length).toEqual(4);
    expect(testMatrix[0].length).toEqual(4);
  });
  it("submitUsername test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("nameIsSubmited")).toBeFalsy();
    wrapper.instance().submitUsername(formEvent);
    expect(wrapper.state("nameIsSubmited")).toBeTruthy();
  });
  it("handleUsername test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("username")).toEqual("Guest");
    const mockEvent = {
      target: {
        name: "username",
        value: "John Doe",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleUsername(mockEvent);
    expect(wrapper.state("username")).toEqual("John Doe");
  });
  it("handleFilledPercent test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("initialPercent")).toEqual(0);
    const mockEvent = {
      target: {
        name: "filledPercent",
        value: "50",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleFilledPercent(mockEvent);
    expect(wrapper.state("initialPercent")).toEqual(50);
  });
  it("handleXSizeChange test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("xSize")).toEqual(2);
    const mockEvent = {
      target: {
        name: "xSize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleXSizeChange(mockEvent);
    expect(wrapper.state("xSize")).toEqual(4);
  });
  it("handleYSizeChange test", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("ySize")).toEqual(2);
    const mockEvent = {
      target: {
        name: "ySize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleYSizeChange(mockEvent);
    expect(wrapper.state("ySize")).toEqual(4);
  });
});
