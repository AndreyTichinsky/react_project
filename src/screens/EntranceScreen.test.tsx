import React from "react";
import EntranceScreen from "@/containers/EntranceScreen";
import { mount } from "enzyme";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("EntranceScreen", () => {
  it("submit new user", () => {
    const name = "John Doe";
    const wrapper = mount(
      <Provider store={store}>
        <EntranceScreen />
      </Provider>
    );

    wrapper.find("input").simulate("change", { target: { value: name } });
    wrapper.find("form").simulate("submit", { preventDefault: () => null });
    expect(mockHistory.push).toHaveBeenCalledWith(`/users/${name}`);
  });
});
