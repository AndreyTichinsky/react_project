import React from "react";
import { EntranceScreen } from "./EntranceScreen";
import { mount } from "enzyme";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("EntranceScreen", () => {
  it("submit new user", () => {
    const name = "John Doe";
    const wrapper = mount(<EntranceScreen />);

    wrapper.find("input").simulate("change", { target: { value: name } });
    wrapper.find("form").simulate("submit", { preventDefault: () => null });
    expect(mockHistory.push).toHaveBeenCalledWith(`/users/${name}`);
  });
});
