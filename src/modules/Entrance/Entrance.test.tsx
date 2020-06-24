import React from "react";
import { mount } from "enzyme";
import { EntranceComponent } from "./Entrance";

const defaultProps = {
  username: "Guest",
  submitHandler: jest.fn(),
  handleUsername: jest.fn(),
};

describe("Entrance tests", () => {
  it("input init username test", () => {
    const wrapper = mount(<EntranceComponent {...defaultProps} />);
    expect(wrapper.find("input").prop("value")).toEqual("Guest");
  });
  it("submit Guest username test", () => {
    const wrapper = mount(<EntranceComponent {...defaultProps} />);
    wrapper.find("button.submit_username_button").simulate("click");
    expect(wrapper.prop("username")).toStrictEqual("Guest");
  });
});
