import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { RawGame } from "./RawGame";
import { MemoryRouter, Route } from "react-router";

describe("RawGame test", () => {
  it("when login with initialEntries and then press logout button to logout to home page", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    let mockHistory: any, mockLocation: any;
    render(
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
      </MemoryRouter>,
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
