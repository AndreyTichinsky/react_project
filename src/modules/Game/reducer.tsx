import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BooleanMatrix } from "types/game";
import * as helper from "@/modules/Game/GameHelper";

export type GameState = {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  cellSize: number;
  fieldState: BooleanMatrix;
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
    setCellState: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      const fieldStateCopy = state.fieldState.map((row) => [...row]);
      fieldStateCopy[payload.y][payload.x] = !fieldStateCopy[payload.y][
        payload.x
      ];
      return {
        ...state,
        fieldState: fieldStateCopy,
      };
    },
    setProgress: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        gameInProgress: action.payload,
      };
    },
    setInitialPercent: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        initialPercent: action.payload,
      };
    },
    setXSize: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        xSize: action.payload,
      };
    },
    setYSize: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ySize: action.payload,
      };
    },
    setSpeed: (state, action: PayloadAction<any>) => {
      return { ...state, updateSpeed: action.payload };
    },
    setFieldState: (state, action: PayloadAction<any>) => {
      return { ...state, fieldState: action.payload };
    },
    setAnyState: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { reducer, actions } = gameSlice;
