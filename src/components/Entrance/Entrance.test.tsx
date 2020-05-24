import React from "react";
import { mount, shallow } from "enzyme";
import { Entrance } from "./Entrance";

const defaultProps = {
  username: "Guest",
  submitHandler: jest.fn(),
  handleUsername: jest.fn(),
};

describe("Entrance tests", () => {
  it("input init username test", () => {
    const wrapper = mount(<Entrance {...defaultProps} />);
    expect(wrapper.find("input").prop("value")).toEqual("Guest");
  });
  it("submit Guest username test", () => {
    const wrapper = mount(<Entrance {...defaultProps} />);
    wrapper.find("button.submit_username_button").simulate("click");
    expect(wrapper.prop("username")).toStrictEqual("Guest");
  });
  it("initial prop username to equals default value", () => {
    const wrapper = mount(<Entrance {...defaultProps} />);
    expect(wrapper.prop("username")).toBe("Guest");
  });
});
