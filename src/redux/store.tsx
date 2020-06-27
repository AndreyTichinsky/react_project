import { reducer } from "./reducer";
import { BooleanMatrix } from "types/game";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { checkEnd } from "@/modules/Game/saga";
import * as helper from "@/modules/Game/GameHelper";

export interface State {
  game: {
    xSize: number;
    ySize: number;
    updateSpeed: string;
    initialPercent: number;
    gameInProgress: boolean;
    cellSize: number;
    fieldState: BooleanMatrix;
  };
  entrance: {
    username: string;
  };
}

export const preloadedState: State = {
  game: {
    initialPercent: 0,
    xSize: 5,
    ySize: 5,
    cellSize: 10,
    updateSpeed: "slow",
    gameInProgress: false,
    fieldState: helper.makeMatrix(5, 5, 0),
  },
  entrance: {
    username: "Guest",
  },
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  preloadedState,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(checkEnd);

export type AppDispatch = typeof store.dispatch;
