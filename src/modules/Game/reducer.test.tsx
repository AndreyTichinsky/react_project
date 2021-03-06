import { actions, reducer, initialState } from "./reducer";
import type { GameState } from "./reducer";

describe("Game reducer", () => {
  let cloneInitialState: GameState;
  beforeEach(() => {
    cloneInitialState = {
      ...initialState,
      fieldState: [0, 0, 0, 0],
    };
  });

  it("when cell value is false and call setCellState then fiedlState cell change its value", () => {
    expect(cloneInitialState.fieldState[0]).toEqual(0);
    expect(reducer(cloneInitialState, actions.setCellState(0))).toEqual({
      ...cloneInitialState,
      fieldState: [1, 0, 0, 0],
    });
  });
  it("when cell value is true and call setCellState then fiedlState cell change its value", () => {
    const newState = reducer(cloneInitialState, actions.setCellState(0));
    expect(reducer(newState, actions.setCellState(0))).toEqual({
      ...cloneInitialState,
      fieldState: [0, 0, 0, 0],
    });
  });
  it("play expect to change gameInProgress property", () => {
    expect(initialState.gameInProgress).toEqual(false);
    expect(reducer(initialState, actions.play())).toEqual({
      ...initialState,
      gameInProgress: true,
    });
  });
  it("stop expect to change gameInProgress property", () => {
    const newState = reducer(cloneInitialState, actions.play());
    expect(newState.gameInProgress).toEqual(true);
    expect(reducer(newState, actions.stop())).toEqual({
      ...newState,
      gameInProgress: false,
    });
  });
  it("setInitialPercent expect to change initialPercent property", () => {
    expect(initialState.initialPercent).toEqual(0);
    expect(reducer(initialState, actions.setInitialPercent(50))).toEqual({
      ...initialState,
      initialPercent: 50,
    });
  });
  it("setXSize expect to change xSize property", () => {
    expect(initialState.xSize).toEqual(5);
    expect(reducer(initialState, actions.setXSize(10))).toEqual({
      ...initialState,
      xSize: 10,
    });
  });
  it("setYSize expect to change ySize property", () => {
    expect(initialState.ySize).toEqual(5);
    expect(reducer(initialState, actions.setYSize(10))).toEqual({
      ...initialState,
      ySize: 10,
    });
  });
  it("setSpeed expect to change updateSpeed property", () => {
    expect(initialState.updateSpeed).toEqual("slow");
    expect(reducer(initialState, actions.setSpeed("fast"))).toEqual({
      ...initialState,
      updateSpeed: "fast",
    });
  });
  it("setFieldState expect to change fieldState property", () => {
    expect(cloneInitialState.fieldState).toEqual([0, 0, 0, 0]);
    expect(
      reducer(cloneInitialState, actions.setFieldState([1, 0, 0, 1]))
    ).toEqual({
      ...cloneInitialState,
      fieldState: [1, 0, 0, 1],
    });
  });
  it("updateFieldState expect to change fieldState property", () => {
    expect(cloneInitialState.fieldState).toEqual([0, 0, 0, 0]);
    expect(
      reducer(cloneInitialState, actions.updateFieldState([1, 0, 0, 1]))
    ).toEqual({
      ...cloneInitialState,
      fieldState: [1, 0, 0, 1],
    });
  });
});
