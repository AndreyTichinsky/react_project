import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FieldData } from "types/game";
import * as helper from "./GameHelper";

export type GameState = {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  cellSize: number;
  fieldState: FieldData;
};

export const initialState: GameState = {
  initialPercent: 0,
  xSize: 5,
  ySize: 5,
  cellSize: 10,
  updateSpeed: "slow",
  gameInProgress: false,
  fieldState: helper.makeMatrix(5, 5, 0),
};

export const gameSlice = createSlice({
  name: "GAME",
  initialState,
  reducers: {
    setCellState: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      const fieldStateCopy = state.fieldState.slice();
      fieldStateCopy[payload] = fieldStateCopy[payload] === 1 ? 0 : 1;
      return {
        ...state,
        fieldState: fieldStateCopy,
      };
    },
    setProgress: (state) => {
      return { ...state };
    },
    stop: (state) => {
      return {
        ...state,
        gameInProgress: false,
      };
    },
    play: (state) => {
      return {
        ...state,
        gameInProgress: true,
      };
    },
    setInitialPercent: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        initialPercent: action.payload,
      };
    },
    setXSize: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        xSize: action.payload,
      };
    },
    setYSize: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        ySize: action.payload,
      };
    },
    setSpeed: (state, action: PayloadAction<string>) => {
      return { ...state, updateSpeed: action.payload };
    },
    setFieldState: (state, action: PayloadAction<FieldData>) => {
      return { ...state, fieldState: action.payload };
    },
    reset: (state) => {
      return { ...state };
    },
    generateRandomField: (state) => {
      return { ...state };
    },
    updateFieldState: (state, action: PayloadAction<FieldData>) => {
      return { ...state, fieldState: action.payload };
    },
  },
});

export const { reducer, actions } = gameSlice;
