import { reducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { State } from "./reducers";
import * as helper from "@/components/Game/GameHelper";

export const preloadedState: State = {
  username: "Guest",
  initialPercent: 0,
  xSize: 5,
  ySize: 5,
  cellSize: 10,
  updateSpeed: "slow",
  gameInProgress: false,
  fieldState: helper.makeMatrix(5, 5, 0),
};

export const store = configureStore({
  reducer,
  preloadedState,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
