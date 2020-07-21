import { select, take, put, call, fork, delay } from "redux-saga/effects";
import * as helper from "./GameHelper";
import { Cache } from "@/modules/Game/Game.interface";
import {
  getFieldState,
  getXSizeState,
  getYSizeState,
  getInitialPercent,
  getGameInProgress,
  getFieldUpdateSpeed,
} from "./selectors";
import { actions } from "./reducer";
import { FieldData } from "@/types/game";

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

interface SpeedInterface {
  [index: string]: number;
}

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

export function* checkSize() {
  while (true) {
    const action = yield take([actions.setXSize, actions.setYSize]);
    const fieldState = yield select(getFieldState);
    const oldX = yield select(getXSizeState);
    const oldY = yield select(getYSizeState);
    let newFieldState;
    if (action.type === actions.setXSize.type) {
      newFieldState = updateStateMatrix({
        newY: oldY,
        newX: action.payload,
        fieldState,
        oldX: fieldState.length / oldY,
        oldY,
      });
    } else if (action.type === actions.setYSize.type) {
      newFieldState = updateStateMatrix({
        newY: action.payload,
        newX: oldX,
        fieldState,
        oldX,
        oldY: fieldState.length / oldX,
      });
    }
    yield put(actions.setFieldState(newFieldState));
  }
}

export function updateStateMatrix({
  fieldState,
  oldY,
  oldX,
  newY,
  newX,
}: {
  fieldState: FieldData;
  oldY: number;
  oldX: number;
  newY: number;
  newX: number;
}) {
  return helper.mergeMatrices(fieldState, oldY, oldX, newY, newX);
}

export function* checkReset() {
  while (true) {
    yield take(actions.reset);
    const xSize = yield select(getXSizeState);
    const ySize = yield select(getYSizeState);
    yield put(actions.setFieldState(helper.makeMatrix(ySize, xSize, 0)));
    yield put(actions.setInitialPercent(0));
  }
}

export function* checkGenerateRandom() {
  while (true) {
    yield take(actions.generateRandomField);
    const xSize = yield select(getXSizeState);
    const ySize = yield select(getYSizeState);
    const initialPercent = yield select(getInitialPercent);
    yield put(
      actions.setFieldState(helper.makeMatrix(ySize, xSize, initialPercent))
    );
  }
}

export function* checkProgress() {
  while (true) {
    yield take(actions.setProgress);
    const gameInProgress = yield select(getGameInProgress);
    if (gameInProgress) {
      yield put(actions.stop());
    } else {
      yield put(actions.play());
    }
  }
}

export function* checkPlay() {
  let lastTime = 0;
  const speed: SpeedInterface = {
    slow: 500,
    normal: 350,
    fast: 200,
  };
  while (true) {
    yield take(actions.play);
    const fieldState = yield select(getFieldState);
    const xSize = yield select(getXSizeState);
    const ySize = yield select(getYSizeState);
    const cachedNeighbours: Cache = helper.cacheNeighbours(
      fieldState,
      ySize,
      xSize
    );
    while (true) {
      const updateSpeed = yield select(getFieldUpdateSpeed);
      const time = +new Date();
      const delayTime = Math.max(0, speed[updateSpeed] - (time - lastTime));
      lastTime = time + delayTime;
      yield call(generator, cachedNeighbours);
      yield delay(delayTime);
      const gameInProgress = yield select(getGameInProgress);
      if (!gameInProgress) break;
    }
  }
}

export function* generator(neighbours: Cache) {
  const fieldState = yield select(getFieldState);
  yield put(
    actions.updateFieldState(helper.generationGenerator(fieldState, neighbours))
  );
}

export function* rootSaga() {
  const data: DataType = { cache: { 0: {} }, curSessionId: 0 };
  yield fork(checkEnd, data);
  yield fork(clearCache, data);
  yield fork(checkSize);
  yield fork(checkReset);
  yield fork(checkGenerateRandom);
  yield fork(checkProgress);
  yield fork(checkPlay);
}
