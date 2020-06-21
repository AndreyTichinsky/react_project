import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import RawGame from "@/containers/RawGame";
import { MemoryRouter, Route } from "react-router";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

describe("RawGame test", () => {
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
