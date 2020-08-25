import { combineReducers } from "redux";

import { gameSlice, entranceSlice } from "@/modules";

export const reducer = combineReducers({
  entrance: entranceSlice.reducer,
  game: gameSlice.reducer,
});
