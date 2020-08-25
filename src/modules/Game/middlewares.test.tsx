import { Middleware } from "redux";

import { filledPercentValidation, sizeValidation } from "./middlewares";
import { actions } from "./reducer";

const create = (middleware: Middleware) => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: any) => middleware(store)(next)(action);

  return { store, next, invoke };
};
describe("filledPercentValidation test", () => {
  it("when invoke setInitialPercent action expect next called with setInitialPercent action", () => {
    const { next, invoke } = create(filledPercentValidation);
    invoke(actions.setInitialPercent(10));
    expect(next).toHaveBeenCalledWith(actions.setInitialPercent(10));
  });
  it("when invoke setFieldState action expect next called with setFieldState action", () => {
    const { next, invoke } = create(filledPercentValidation);
    invoke(actions.setFieldState([0, 0, 0, 0]));
    expect(next).toHaveBeenCalledWith(actions.setFieldState([0, 0, 0, 0]));
  });
  it("when invoke setInitialPercent action with invalid value then dispatch called with percentValidationFailed", () => {
    const { store, invoke } = create(filledPercentValidation);
    invoke(actions.setInitialPercent(-1));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "percentValidationFailed",
    });
  });
  it("when invoke setInitialPercent action with not a number value then dispatch called with percentValidationFailed", () => {
    const { store, invoke } = create(filledPercentValidation);
    invoke(actions.setInitialPercent(NaN));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "percentValidationFailed",
    });
  });
});

describe("sizeValidation test", () => {
  it("when invoke setXSize action expect next called with setXSize action", () => {
    const { next, invoke } = create(sizeValidation);
    invoke(actions.setXSize(10));
    expect(next).toHaveBeenCalledWith(actions.setXSize(10));
  });
  it("when invoke setYSize action expect next called with setYSize action", () => {
    const { next, invoke } = create(sizeValidation);
    invoke(actions.setYSize(10));
    expect(next).toHaveBeenCalledWith(actions.setYSize(10));
  });
  it("when invoke setFieldState action expect next called with setFieldState action", () => {
    const { next, invoke } = create(sizeValidation);
    invoke(actions.setFieldState([0, 0, 0, 0]));
    expect(next).toHaveBeenCalledWith(actions.setFieldState([0, 0, 0, 0]));
  });
  it("when invoke setXSize action with invalid value then dispatch called with sizeValidationFailed", () => {
    const { store, invoke } = create(sizeValidation);
    invoke(actions.setXSize(-1));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "sizeValidationFailed",
    });
  });
  it("when invoke setXSize action with not a number value then dispatch called with sizeValidationFailed", () => {
    const { store, invoke } = create(sizeValidation);
    invoke(actions.setXSize(NaN));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "sizeValidationFailed",
    });
  });
});
