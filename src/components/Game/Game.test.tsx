import React from "react";
import { mount, shallow } from "enzyme";
import { Game } from "./Game";
import { calculatePercentage } from "./GameHelper";

const mock = jest.fn();

const defaultProps = {
  xSize: 2,
  ySize: 2,
  cellSize: 50,
  updateSpeed: "slow",
  gameInProgress: false,
  username: "Guest",
  onLogout: mock,
};

const formEvent = {
  preventDefault: (): void => {
    void 0;
  },
} as React.FormEvent;

describe("Game", () => {
  it("when init game expect props equality to defaultProps", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    expect(wrapper.props()).toEqual({
      xSize: 2,
      ySize: 2,
      cellSize: 50,
      updateSpeed: "slow",
      gameInProgress: false,
      username: "Guest",
      onLogout: mock,
    });
  });

  it("when set new props expect equality to certain props", () => {
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
      username: "Guest",
      onLogout: mock,
    });
  });

  it("when set gameInProgress property to true expect progress button to change text to 'stop'", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper.setProps({
      gameInProgress: true,
    });
    expect(wrapper.find("button.progress_button").text()).toEqual("Stop");
  });

  it("when simulate click to progress button expect gameInProgress to be truthy", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper.find("button.progress_button").simulate("click");
    expect(wrapper.state("gameInProgress")).toBeTruthy();
  });

  it("when speed select change to value 'fast' expect updateSpeed to equals 'fast'", () => {
    const wrapper = mount(<Game {...defaultProps} />);
    wrapper
      .find("select.speed_select")
      .simulate("change", { target: { value: "fast" } });
    expect(wrapper.state("updateSpeed")).toEqual("fast");
  });

  // handlers testing
  it("when invoke handleReset expect fieldState to be empty", () => {
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

  it("when invoke handleUpdate expect fieldState update its size", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("xSize")).toBe(2);
    expect(wrapper.state("ySize")).toBe(2);
    wrapper.setState({
      xSize: 4,
      ySize: 4,
    });
    wrapper.instance().handleUpdate();
    expect(wrapper.state("fieldState")).toStrictEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ]);
    expect(wrapper.state("xSize")).toEqual(4);
    expect(wrapper.state("ySize")).toEqual(4);
  });

  it("when invoke handleProgress expect gameInProgress to be truthy", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("gameInProgress")).toBeFalsy();
    wrapper.instance().handleProgress(formEvent);
    expect(wrapper.state("gameInProgress")).toBeTruthy();
  });

  it("when invoke handleGenerator expect generated matrix to equals state properties", () => {
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
  it("when invoke handleFilledPercent expect initialPercent state to equals event target value", () => {
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
  it("when invoke handleXSizeChange expect xSize state to equals event target value", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("xSize")).toEqual(2);
    const mockEvent = {
      target: {
        name: "xSize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleSize(mockEvent, "handleXSizeChange");
    expect(wrapper.state("xSize")).toEqual(4);
  });
  it("when invoke handleYSizeChange expect ySize state to equals event target value", () => {
    const wrapper = shallow<Game>(<Game {...defaultProps} />);
    expect(wrapper.state("ySize")).toEqual(2);
    const mockEvent = {
      target: {
        name: "ySize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.instance().handleSize(mockEvent, "handleYSizeChange");
    expect(wrapper.state("ySize")).toEqual(4);
  });
});
