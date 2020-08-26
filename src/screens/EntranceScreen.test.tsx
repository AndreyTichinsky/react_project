import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { EntranceScreen } from "@/screens";
import { preloadedState, reducer, State } from "@/redux";

import "mock-local-storage";
Object.defineProperty(window, "localStorage", {
  value: localStorage,
  configurable: true,
  enumerable: true,
  writable: true,
});

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("EntranceScreen", () => {
  localStorage.setItem("GameOfLife", JSON.stringify({ username: "Andrey" }));
  let store: EnhancedStore<State>, wrapper: ReactWrapper;
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
    localStorage.clear();
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
