import { reducer, State } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { checkEnd } from "./saga";
import * as helper from "@/modules/Game/GameHelper";

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

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  preloadedState,
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(checkEnd);

export type AppDispatch = typeof store.dispatch;
