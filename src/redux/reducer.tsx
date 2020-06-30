import { combineReducers } from "redux";
import { gameSlice } from "@/modules/Game/reducer";
import { entranceSlice } from "@/modules/Entrance/reducer";

export const reducer = combineReducers({
  entrance: entranceSlice.reducer,
  game: gameSlice.reducer,
});
