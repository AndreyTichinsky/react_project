import type { Middleware } from "redux";
import { gameActions } from "@/modules";
import * as helper from "./GameHelper";

export const filledPercentValidation: Middleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  if (action.type !== gameActions.setInitialPercent.type) {
    return next(action);
  }
  let ifPassValidation = true;
  if (!helper.isNumber(action.payload)) {
    console.error("Not a number");
    ifPassValidation = false;
  }
  if (!helper.assertPercentValue(action.payload)) {
    console.error("Value must be between 0 and 100");
    ifPassValidation = false;
  }
  return ifPassValidation
    ? next(action)
    : dispatch({ type: "percentValidationFailed" });
};

export const sizeValidation: Middleware = ({ dispatch, getState }) => (
  next
) => (action) => {
  if (
    action.type !== gameActions.setXSize.type &&
    action.type !== gameActions.setYSize.type
  ) {
    return next(action);
  }
  let ifPassValidation = true;
  if (!helper.isNumber(action.payload)) {
    console.error("Not a number");
    ifPassValidation = false;
  }
  if (!helper.assertSizeValue(action.payload)) {
    console.error("invalid value: size must be positive non-zero number");
    ifPassValidation = false;
  }
  return ifPassValidation
    ? next(action)
    : dispatch({ type: "sizeValidationFailed" });
};
