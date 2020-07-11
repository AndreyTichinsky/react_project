import { select, take, put, call, fork, all } from "redux-saga/effects";
import { getFieldState } from "./selectors";
import { actions } from "./reducer";

export type SessionType = {
  [key: string]: boolean;
};
export type CacheType = {
  [key: number]: SessionType;
};
export type DataType = {
  cache: CacheType;
  curSessionId: number;
};

export function* checkEnd(data: DataType) {
  while (true) {
    yield take(actions.updateFieldState);
    const curFieldState = yield select(getFieldState);
    const result = yield call(checkRepeat, {
      strFieldState: curFieldState.join(""),
      data,
    });
    if (result) {
      yield put(actions.stop());
    }
  }
}

export function checkRepeat({
  strFieldState,
  data,
}: {
  strFieldState: string;
  data: DataType;
}) {
  const inCache = data.cache[data.curSessionId][strFieldState];
  if (inCache) {
    return true;
  } else {
    data.cache[data.curSessionId][strFieldState] = true;
    return false;
  }
}

export function* clearCache(data: DataType) {
  while (true) {
    yield take([actions.reset, actions.setFieldState]);
    yield call(clearSession, data);
  }
}

export function clearSession(data: DataType) {
  delete data.cache[data.curSessionId];
  data.curSessionId++;
  data.cache[data.curSessionId] = {};
}

export function* rootSaga() {
  const data: DataType = { cache: { 0: {} }, curSessionId: 0 };
  yield fork(checkEnd, data);
  yield fork(clearCache, data);
}
