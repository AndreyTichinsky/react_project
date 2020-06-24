import React from "react";
import { mount } from "enzyme";
import { Game } from "./Game";
import { calculatePercentage } from "./GameHelper";
import { configureStore } from "@reduxjs/toolkit";
import { reducer, State } from "@/redux/reducers";
import { Provider } from "react-redux";
import {
  setFieldState,
  setInitialPercent,
  setProgress,
  setXSize,
  setYSize,
} from "@/redux/actions";

const preloadedState: State = {
  username: "Guest",
  initialPercent: 0,
  xSize: 2,
  ySize: 2,
  cellSize: 10,
  updateSpeed: "slow",
  gameInProgress: false,
  fieldState: [
    [false, false],
    [false, false],
  ],
};

describe("Game", () => {
  let store: any, wrapper: any;
  beforeEach(() => {
    store = configureStore({
      reducer,
      preloadedState,
      devTools: true,
    });
    wrapper = mount(
      <Provider store={store}>
        <Game />
      </Provider>
    );
  });
  afterEach(() => {
    wrapper.unmount();
    store = null;
  });

  it("when dispatch setXSize action then state equals to expect value", () => {
    store.dispatch(setXSize(5));
    expect(store.getState().xSize).toEqual(5);
  });
  it("when dispatch setYSize action then state equals to expect value", () => {
    store.dispatch(setYSize(5));
    expect(store.getState().ySize).toEqual(5);
  });
  it("when dispatch setProgress action then StartForm button change its text", () => {
    store.dispatch(setProgress(true));
    expect(wrapper.find("button.progress_button").text()).toEqual("Stop");
  });
  it("when simulate click to progress button expect gameInProgress to be truthy", () => {
    wrapper.find("button.progress_button").simulate("click");
    expect(store.getState().gameInProgress).toBeTruthy();
  });
  it("when speed select change to value 'fast' expect updateSpeed to equals 'fast'", () => {
    wrapper
      .find("select.speed_select")
      .simulate("change", { target: { value: "fast" } });
    expect(store.getState().updateSpeed).toEqual("fast");
  });
  it("when invoke handleReset expect fieldState to be empty", () => {
    store.dispatch(
      setFieldState([
        [true, true],
        [true, true],
      ])
    );
    wrapper.find("button.reset_button").simulate("click");
    expect(store.getState().fieldState).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });
  it("when click random generator button expect generated matrix to equals state properties", () => {
    store.dispatch(setXSize(4));
    store.dispatch(setYSize(4));
    store.dispatch(setInitialPercent(50));
    wrapper.find("button.generator_button").simulate("click");
    const testMatrix = store.getState().fieldState;
    const percent = calculatePercentage(testMatrix);
    expect(percent).toEqual(50);
    expect(testMatrix.length).toEqual(4);
    expect(testMatrix[0].length).toEqual(4);
  });
  it("when simulate change filled_percent input expect initialPercent state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "filledPercent",
        value: "50",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.filled_percent").simulate("change", mockEvent);
    expect(store.getState().initialPercent).toEqual(50);
  });
  it("when simulate change xSize input expect xSize state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "xSize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.xSize_input").simulate("change", mockEvent);
    expect(store.getState().xSize).toEqual(4);
  });
  it("when simulate change ySize input expect ySize state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "ySize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.ySize_input").simulate("change", mockEvent);
    expect(store.getState().ySize).toEqual(4);
  });
});
