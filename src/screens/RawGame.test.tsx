import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { RawGame } from "@/screens/RawGame";
import { MemoryRouter, Route } from "react-router";
import { Provider } from "react-redux";
import { preloadedState } from "@/redux/store";
import { reducer } from "@/redux/reducer";
import { configureStore } from "@reduxjs/toolkit";

describe("RawGame test", () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
  });
  afterEach(() => {
    store = null;
  });
  it("when login with initialEntries and then press logout button to logout to home page", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    let mockHistory: any, mockLocation: any;
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/Andrey"]}>
          <Route path={`/users/:username`} component={RawGame} />;
          <Route
            path="*"
            render={({ history, location }) => {
              mockHistory = history;
              mockLocation = location;
              return null;
            }}
          />
        </MemoryRouter>
      </Provider>,
      root
    );
    expect(mockLocation.pathname).toEqual("/users/Andrey");

    act(() => {
      const logoutButton = document.body.querySelector(".logout_button");
      logoutButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockLocation.pathname).toEqual("/");
  });
});
