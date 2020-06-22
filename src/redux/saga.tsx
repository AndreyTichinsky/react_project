import { select, take, put, call } from "redux-saga/effects";
import { getFieldState } from "./selectors";
import { setProgress } from "./actions";
import { BooleanMatrix } from "@/types/game";

export function* checkEnd() {
  let lastFieldState: BooleanMatrix | any = null;
  while (true) {
    yield take("SET_FIELD_STATE");
    const curFieldState = yield select(getFieldState);
    const result = yield call(checkEquality, lastFieldState, curFieldState);
    if (result) {
      yield put(setProgress(!result));
    }
    lastFieldState = curFieldState.map((row: any) => [...row]);
  }
}

export const checkEquality = (
  lastState: BooleanMatrix,
  curState: BooleanMatrix
): boolean => {
  return (
    lastState !== null &&
    curState.every((row: any, i: number) =>
      row.every((cell: boolean, j: number) => cell === lastState[i][j])
    )
  );
};
