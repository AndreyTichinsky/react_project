import { expectSaga } from "redux-saga-test-plan";
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
import type { State } from "@/redux/store";

import {
  checkEnd,
  checkRepeat,
  updateStateMatrix,
  clearCache,
  clearSession,
  checkSize,
  checkReset,
  checkGenerateRandom,
  checkProgress,
  checkPlay,
  generator,
} from "./saga";
import type { DataType } from "./saga";
import { preloadedState } from "../../../.history/src/modules/Game/saga.test_20200818202446";

describe("Sagas test", () => {
  let preloadedState: State;
  beforeEach(() => {
    preloadedState = {
      game: {
        xSize: 2,
        ySize: 2,
        updateSpeed: "slow",
        initialPercent: 0,
        gameInProgress: false,
        cellSize: 10,
        fieldState: [0, 0, 0, 0],
      },
      entrance: {
        username: "Guest",
      },
    };
  });

  describe("checkEnd saga", () => {
    let data: DataType;
    beforeEach(() => {
      data = { cache: { 0: {} }, curSessionId: 0 };
    });

    it(`when first time setFieldState dispatched then stop not fired,
        when second time setFieldState dispatched and fieldState equals then stop fired`, () => {
      return expectSaga(checkEnd, data)
        .withState(preloadedState)
        .dispatch(actions.updateFieldState([0, 0, 0, 0]))
        .select(getFieldState)
        .call(checkRepeat, {
          strFieldState: [0, 0, 0, 0].join(""),
          data,
        })
        .not.put(actions.play())
        .dispatch(actions.updateFieldState([0, 0, 0, 0]))
        .select(getFieldState)
        .call(checkRepeat, {
          strFieldState: [0, 0, 0, 0].join(""),
          data: { cache: { 0: { "0000": true } }, curSessionId: 0 },
        })
        .put(actions.stop())
        .silentRun();
    });
  });

  describe("clearCache", () => {
    let data: DataType;
    beforeEach(() => {
      data = { cache: { 0: { "0000": true } }, curSessionId: 0 };
    });
    it("when reset is dispatched then clearSession to be called", () => {
      return expectSaga(clearCache, data)
        .dispatch(actions.reset())
        .call(clearSession, data)
        .silentRun();
    });
    it("when setFieldState is dispatched then clearSession to be called", () => {
      return expectSaga(clearCache, data)
        .dispatch(actions.setFieldState([0, 0, 0, 0]))
        .call(clearSession, data)
        .silentRun();
    });
  });

  describe("checkSize", () => {
    it("when setXSize is dispatched then setFieldState to be dispatched", () => {
      return expectSaga(checkSize)
        .withState(preloadedState)
        .dispatch(actions.setXSize(3))
        .select(getFieldState)
        .select(getXSizeState)
        .select(getYSizeState)
        .call(updateStateMatrix, {
          newY: 2,
          newX: 3,
          fieldState: [0, 0, 0, 0],
          oldX: 2,
          oldY: 2,
        })
        .put(actions.setFieldState([0, 0, 0, 0, 0, 0]))
        .silentRun();
    });
    it("when setYSize is dispatched then setFieldState to be dispatched", () => {
      return expectSaga(checkSize)
        .withState(preloadedState)
        .dispatch(actions.setYSize(3))
        .select(getFieldState)
        .select(getXSizeState)
        .select(getYSizeState)
        .call(updateStateMatrix, {
          newY: 3,
          newX: 2,
          fieldState: [0, 0, 0, 0],
          oldX: 2,
          oldY: 2,
        })
        .put(actions.setFieldState([0, 0, 0, 0, 0, 0]))
        .silentRun();
    });
  });

  describe("checkReset", () => {
    it("when reset is dispatched then setFieldState and setInitialPercent to be dispatched", () => {
      return expectSaga(checkReset)
        .withState(preloadedState)
        .dispatch(actions.reset())
        .select(getXSizeState)
        .select(getYSizeState)
        .put(actions.setFieldState([0, 0, 0, 0]))
        .put(actions.setInitialPercent(0))
        .silentRun();
    });
  });

  describe("checkGenerateRandom", () => {
    it("when generateRandomField is dispatched then setFieldState to be dispatched", () => {
      return expectSaga(checkGenerateRandom)
        .withState(preloadedState)
        .dispatch(actions.generateRandomField())
        .select(getXSizeState)
        .select(getYSizeState)
        .select(getInitialPercent)
        .put(actions.setFieldState([0, 0, 0, 0]))
        .silentRun();
    });
  });

  describe("checkProgress", () => {
    it("when setProgress is dispatched and game not in progress then play to be dispatched", () => {
      return expectSaga(checkProgress)
        .withState(preloadedState)
        .dispatch(actions.setProgress())
        .select(getGameInProgress)
        .put(actions.play())
        .silentRun();
    });
    it("when setProgress is dispatched and game in progress then stop to be dispatched", () => {
      return expectSaga(checkProgress)
        .withState({
          ...preloadedState,
          game: {
            ...preloadedState.game,
            gameInProgress: true,
          },
        })
        .dispatch(actions.setProgress())
        .select(getGameInProgress)
        .put(actions.stop())
        .silentRun();
    });
  });

  describe("checkPlay", () => {
    let cachedNeighbours: Cache;
    beforeEach(() => {
      cachedNeighbours = {
        "0": [15, 12, 13, 3, 1, 7, 4, 5],
        "1": [12, 13, 14, 0, 2, 4, 5, 6],
        "2": [13, 14, 15, 1, 3, 5, 6, 7],
        "3": [14, 15, 12, 2, 0, 6, 7, 4],
        "4": [3, 0, 1, 7, 5, 11, 8, 9],
        "5": [0, 1, 2, 4, 6, 8, 9, 10],
        "6": [1, 2, 3, 5, 7, 9, 10, 11],
        "7": [2, 3, 0, 6, 4, 10, 11, 8],
        "8": [7, 4, 5, 11, 9, 15, 12, 13],
        "9": [4, 5, 6, 8, 10, 12, 13, 14],
        "10": [5, 6, 7, 9, 11, 13, 14, 15],
        "11": [6, 7, 4, 10, 8, 14, 15, 12],
        "12": [11, 8, 9, 15, 13, 3, 0, 1],
        "13": [8, 9, 10, 12, 14, 0, 1, 2],
        "14": [9, 10, 11, 13, 15, 1, 2, 3],
        "15": [10, 11, 8, 14, 12, 2, 3, 0],
      };
    });
    it("when play is dispatched then game in progress", () => {
      return expectSaga(checkPlay)
        .withState({
          ...preloadedState,
          game: {
            ...preloadedState.game,
            xSize: 4,
            ySize: 4,
            fieldState: [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
          },
        })
        .dispatch(actions.play())
        .select(getFieldState)
        .select(getXSizeState)
        .select(getYSizeState)
        .select(getFieldUpdateSpeed)
        .call(generator, cachedNeighbours)
        .select(getGameInProgress)
        .silentRun();
    });
  });
});
