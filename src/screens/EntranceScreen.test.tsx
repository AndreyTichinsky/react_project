import React from "react";
import { EntranceScreen } from "@/screens/EntranceScreen";
import { mount } from "enzyme";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { preloadedState } from "@/redux/store";
import { reducer } from "@/redux/reducer";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

describe("EntranceScreen", () => {
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
  });
  it("submit new user", () => {
    const name = "John Doe";
    wrapper.find("input").simulate("change", { target: { value: name } });
    wrapper.find("form").simulate("submit", { preventDefault: () => null });
    expect(mockHistory.push).toHaveBeenCalledWith(`/users/${name}`);
  });
});
