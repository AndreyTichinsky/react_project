import { BooleanMatrix } from "../types/game";
import { AnyAction, Reducer } from "redux";

export interface State {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  username: string;
  cellSize: number;
  fieldState: BooleanMatrix;
}

export const reducer: Reducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "SET_INITIAL_PERCENT":
      return {
        ...state,
        initialPercent: action.payload,
      };
    case "SET_X_SIZE":
      return { ...state, xSize: action.payload };
    case "SET_Y_SIZE":
      return { ...state, ySize: action.payload };
    case "SET_SPEED":
      return { ...state, updateSpeed: action.payload };
    case "SET_PROGRESS":
      return { ...state, gameInProgress: action.payload };
    case "SET_FIELD_STATE":
      return { ...state, fieldState: action.payload };
    case "SET_CELL_STATE":
      return setCellState(state, action.payload);
    case "SET_ANY_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const setCellState = (state: State, payload: any) => {
  const fieldStateCopy = state.fieldState.map((row) => [...row]);
  fieldStateCopy[payload.y][payload.x] = !fieldStateCopy[payload.y][payload.x];
  return {
    ...state,
    fieldState: fieldStateCopy,
  };
};
