import { BooleanMatrix } from "../types/game";
import { AnyAction } from "redux";

export type ActionCreator = (payload: any) => AnyAction;

export const setUsername: ActionCreator = (payload: any) => ({
  type: "SET_USERNAME",
  payload,
});

export const setInitialPercent: ActionCreator = (payload: any) => ({
  type: "SET_INITIAL_PERCENT",
  payload,
});

export const setXSize: ActionCreator = (payload: any) => ({
  type: "SET_X_SIZE",
  payload,
});

export const setYSize: ActionCreator = (payload: any) => ({
  type: "SET_Y_SIZE",
  payload,
});

export const setSpeed: ActionCreator = (payload: any) => ({
  type: "SET_SPEED",
  payload,
});

export const setProgress: ActionCreator = (payload: any) => ({
  type: "SET_PROGRESS",
  payload,
});

export const setFieldState: ActionCreator = (payload: any) => ({
  type: "SET_FIELD_STATE",
  payload,
});

export const setCellState: ActionCreator = (payload: any) => ({
  type: "SET_CELL_STATE",
  payload,
});

export const setAnyState: ActionCreator = (payload: any) => ({
  type: "SET_ANY_STATE",
  payload,
});
