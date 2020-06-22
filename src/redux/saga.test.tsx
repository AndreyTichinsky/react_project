import { expectSaga } from "redux-saga-test-plan";
import { getFieldState } from "./selectors";
import { setProgress, setFieldState } from "./actions";

import { checkEnd, checkEquality } from "./saga";

export const preloadedState = {
  gameInProgress: true,
  fieldState: [
    [false, false],
    [false, false],
  ],
};

describe("checkEnd saga", () => {
  it(`when first time setFieldState dispatched then setProgress not fired,
       when second time setFieldState dispatched and fieldState equals then setProgress fired`, () => {
    return expectSaga(checkEnd)
      .withState(preloadedState)
      .dispatch(
        setFieldState([
          [false, false],
          [false, false],
        ])
      )
      .select(getFieldState)
      .call(checkEquality, null, [
        [false, false],
        [false, false],
      ])
      .not.put(setProgress(true))
      .dispatch(
        setFieldState([
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
      .put(setProgress(false))
      .silentRun();
  });
});
