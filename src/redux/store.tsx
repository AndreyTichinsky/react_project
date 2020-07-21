import { reducer } from "./reducer";
import { FieldData } from "types/game";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "@/modules/Game/saga";
import {
  filledPercentValidation,
  sizeValidation,
} from "@/modules/Game/middlewares";
import * as helper from "@/modules/Game/GameHelper";

export interface State {
  game: {
    xSize: number;
    ySize: number;
    updateSpeed: string;
    initialPercent: number;
    gameInProgress: boolean;
    cellSize: number;
    fieldState: FieldData;
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
    fieldState: helper.makeEmptyMatrix(5, 5),
  },
  entrance: {
    username: "Guest",
  },
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: [filledPercentValidation, sizeValidation, sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export const { dispatch } = store;
export type AppDispatch = typeof store.dispatch;
