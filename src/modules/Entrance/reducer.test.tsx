import { actions, reducer, initialState } from "./reducer";

describe("Entrance reducer", () => {
  it("when setUsername action call with not empty string then username is set", () => {
    expect(reducer(initialState, actions.setUsername("John Doe"))).toEqual({
      username: "John Doe",
    });
  });
  it("when logout action call then username set to default value", () => {
    reducer(initialState, actions.setUsername("John Doe"));
    expect(reducer(initialState, actions.logout())).toEqual({
      username: "Guest",
    });
  });
});
