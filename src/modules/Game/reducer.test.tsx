import { actions, reducer, initialState } from "./reducer";

describe("Game reducer", () => {
  it("when cell value is false and call setCellState then fiedlState cell change its value", () => {
    expect(initialState.fieldState[0][0]).toEqual(false);
    expect(reducer(initialState, actions.setCellState({ x: 0, y: 0 }))).toEqual(
      {
        ...initialState,
        fieldState: [
          [true, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ],
      }
    );
  });
  it("when cell value is true and call setCellState then fiedlState cell change its value", () => {
    const newState = reducer(
      initialState,
      actions.setCellState({ x: 0, y: 0 })
    );
    expect(reducer(newState, actions.setCellState({ x: 0, y: 0 }))).toEqual({
      ...initialState,
      fieldState: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
    });
  });
  it("setProgress expect to change gameInProgress property", () => {
    expect(initialState.gameInProgress).toEqual(false);
    expect(reducer(initialState, actions.setProgress(true))).toEqual({
      ...initialState,
      gameInProgress: true,
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
    expect(initialState.fieldState).toEqual([
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]);
    expect(
      reducer(
        initialState,
        actions.setFieldState([
          [true, false],
          [false, true],
        ])
      )
    ).toEqual({
      ...initialState,
      fieldState: [
        [true, false],
        [false, true],
      ],
    });
  });
});
