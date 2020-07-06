import React from "react";
import { mount } from "enzyme";
import { Game } from "./Game";
import { calculatePercentage } from "./GameHelper";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { actions } from "./reducer";
import { preloadedState } from "@/redux/store";
import { reducer } from "@/redux/reducer";

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
    store.dispatch(actions.setXSize(5));
    expect(store.getState().game.xSize).toEqual(5);
  });
  it("when dispatch setYSize action then state equals to expect value", () => {
    store.dispatch(actions.setYSize(5));
    expect(store.getState().game.ySize).toEqual(5);
  });
  it("when dispatch play action then StartForm button change its text", () => {
    store.dispatch(actions.play());
    expect(wrapper.find("button.progress_button").text()).toEqual("Stop");
  });
  it("when simulate click to progress button expect gameInProgress to be truthy", () => {
    wrapper.find("button.progress_button").simulate("click");
    expect(store.getState().game.gameInProgress).toBeTruthy();
  });
  it("when speed select change to value 'fast' expect updateSpeed to equals 'fast'", () => {
    wrapper
      .find("select.speed_select")
      .simulate("change", { target: { value: "fast" } });
    expect(store.getState().game.updateSpeed).toEqual("fast");
  });
  it("when invoke handleReset expect fieldState to be empty", () => {
    store.dispatch(actions.setXSize(2));
    store.dispatch(actions.setYSize(2));
    store.dispatch(actions.setFieldState([1, 1, 1, 1]));
    wrapper.find("button.reset_button").simulate("click");
    expect(store.getState().game.fieldState).toStrictEqual([0, 0, 0, 0]);
  });
  it("when click random generator button expect generated matrix to equals state properties", () => {
    store.dispatch(actions.setXSize(4));
    store.dispatch(actions.setYSize(4));
    store.dispatch(actions.setInitialPercent(50));
    wrapper.find("button.generator_button").simulate("click");
    const testMatrix = store.getState().game.fieldState;
    const percent = calculatePercentage(testMatrix);
    expect(percent).toEqual(50);
    expect(testMatrix.length).toEqual(16);
  });
  it("when simulate change filled_percent input expect initialPercent state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "filledPercent",
        value: "50",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.filled_percent").simulate("change", mockEvent);
    expect(store.getState().game.initialPercent).toEqual(50);
  });
  it("when simulate change xSize input expect xSize state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "xSize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.xSize_input").simulate("change", mockEvent);
    expect(store.getState().game.xSize).toEqual(4);
  });
  it("when simulate change ySize input expect ySize state to equals event target value", () => {
    const mockEvent = {
      target: {
        name: "ySize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.ySize_input").simulate("change", mockEvent);
    expect(store.getState().game.ySize).toEqual(4);
  });
  it("when simulate change xSize input expect fiedlstate length equals xSize multiply on ySize", () => {
    expect(store.getState().game.xSize).toEqual(5);
    expect(store.getState().game.ySize).toEqual(5);
    const mockEvent = {
      target: {
        name: "xSize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.xSize_input").simulate("change", mockEvent);
    expect(store.getState().game.fieldState.length).toEqual(20);
  });
  it("when simulate change ySize input expect fiedlstate length equals xSize multiply on ySize", () => {
    expect(store.getState().game.xSize).toEqual(5);
    expect(store.getState().game.ySize).toEqual(5);
    const mockEvent = {
      target: {
        name: "ySize",
        value: "4",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    wrapper.find("input.ySize_input").simulate("change", mockEvent);
    expect(store.getState().game.fieldState.length).toEqual(20);
  });
  it("when game is started and changed select options then state changed to select option value", () => {
    expect(store.getState().game.gameInProgress).toBeFalsy();
    wrapper.find("button.progress_button").simulate("click");
    expect(store.getState().game.gameInProgress).toBeTruthy();
    expect(store.getState().game.updateSpeed).toEqual("slow");
    wrapper
      .find("select.speed_select")
      .simulate("change", { target: { value: "fast" } });
    expect(store.getState().game.updateSpeed).toEqual("fast");
  });
});
