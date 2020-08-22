import React from "react";
import { mount } from "enzyme";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { EntranceScreen } from "@/screens";
import { preloadedState, reducer } from "@/redux";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("EntranceScreen", () => {
  window.localStorage.setItem(
    "GameOfLife",
    JSON.stringify({ username: "Andrey" })
  );
  let store: any, wrapper: any;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
    wrapper = mount(
      <Provider store={store}>
        <EntranceScreen />
      </Provider>
    );
  });
  afterEach(() => {
    wrapper.unmount();
    store = null;
    window.localStorage.clear();
  });
  it("submit logged in user", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault: () => null,
    });
    expect(mockHistory.push).toHaveBeenCalledWith(`/users/Andrey`);
  });
  it("submit new user", () => {
    const name = "John Doe";
    wrapper.find("input").simulate("change", { target: { value: name } });
    wrapper.find("form").simulate("submit", { preventDefault: () => null });
    expect(mockHistory.push).toHaveBeenCalledWith(`/users/${name}`);
  });
});
