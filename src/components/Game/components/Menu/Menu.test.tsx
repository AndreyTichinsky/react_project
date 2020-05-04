import React from "react";
import { mount } from "enzyme";
import { Menu } from "./Menu";

const defaultProps = {
  initialPercent: 0,
  xSize: 10,
  ySize: 10,
  isDisabled: false,
  eventHandler: jest.fn(),
};

describe("Menu tests", () => {
  it("change stateInitialPercent input test", () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    wrapper
      .find("input.filled_percent")
      .simulate("change", { target: { value: 50 } });
    expect(wrapper.find("input.filled_percent").prop("value")).toEqual(50);
  });
  it("change xSize input test", () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    wrapper
      .find("input.xSize_input")
      .simulate("change", { target: { value: 10 } });
    expect(wrapper.find("input.xSize_input").prop("value")).toEqual(10);
  });
  it("change ySize input test", () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    wrapper
      .find("input.ySize_input")
      .simulate("change", { target: { value: 9 } });
    expect(wrapper.find("input.ySize_input").prop("value")).toEqual(9);
  });
});
