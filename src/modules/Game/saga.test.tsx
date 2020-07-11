import { expectSaga } from "redux-saga-test-plan";
import { getFieldState } from "./selectors";
import { actions } from "./reducer";

import { checkEnd, checkRepeat, clearCache, clearSession } from "./saga";
import type { DataType } from "./saga";

export const preloadedState = {
  game: {
    gameInProgress: true,
    fieldState: [0, 0, 0, 0],
  },
};

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
  it("when actions.reset is fired then clearSession to be called", () => {
    return expectSaga(clearCache, data)
      .dispatch(actions.reset([0, 0, 0, 0]))
      .call(clearSession, data)
      .silentRun();
  });
  it("when actions.setFieldState is fired then clearSession to be called", () => {
    return expectSaga(clearCache, data)
      .dispatch(actions.setFieldState([0, 0, 0, 0]))
      .call(clearSession, data)
      .silentRun();
  });
});
