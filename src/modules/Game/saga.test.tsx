import { expectSaga } from "redux-saga-test-plan";
import { getFieldState } from "./selectors";
import { actions } from "./reducer";

import { checkEnd, checkEquality } from "./saga";

export const preloadedState = {
  game: {
    gameInProgress: true,
    fieldState: [
      [false, false],
      [false, false],
    ],
  },
};

describe("checkEnd saga", () => {
  it(`when first time setFieldState dispatched then setProgress not fired,
       when second time setFieldState dispatched and fieldState equals then setProgress fired`, () => {
    return expectSaga(checkEnd)
      .withState(preloadedState)
      .dispatch(
        actions.setFieldState([
          [false, false],
          [false, false],
        ])
      )
      .select(getFieldState)
      .call(checkEquality, null, [
        [false, false],
        [false, false],
      ])
      .not.put(actions.setProgress(true))
      .dispatch(
        actions.setFieldState([
          [false, false],
          [false, false],
        ])
      )
      .select(getFieldState)
      .call(
        checkEquality,
        [
          [false, false],
          [false, false],
        ],
        [
          [false, false],
          [false, false],
        ]
      )
      .put(actions.setProgress(false))
      .silentRun();
  });
});
