import { select, take, put, call } from "redux-saga/effects";
import { getFieldState } from "./selectors";
import { actions } from "./reducer";
import { BooleanMatrix } from "types/game";

export function* checkEnd() {
  let lastFieldState: BooleanMatrix | any = null;
  while (true) {
    yield take(actions.setFieldState);
    const curFieldState = yield select(getFieldState);
    const result = yield call(checkEquality, lastFieldState, curFieldState);
    if (result) {
      yield put(actions.stop());
    }
    lastFieldState = curFieldState.slice();
  }
}

export const checkEquality = (
  lastState: BooleanMatrix,
  curState: BooleanMatrix
): boolean => {
  const checkLastState =
    lastState !== null && lastState.length === curState.length;
  return (
    checkLastState &&
    curState.every((cellValue: number, i: number) => cellValue === lastState[i])
  );
};
