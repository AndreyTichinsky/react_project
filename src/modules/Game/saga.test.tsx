import { expectSaga } from "redux-saga-test-plan";
import { getFieldState } from "./selectors";
import { actions } from "./reducer";

import { checkEnd, checkEquality } from "./saga";

export const preloadedState = {
  game: {
    gameInProgress: true,
    fieldState: [0, 0, 0, 0],
  },
};

describe("checkEnd saga", () => {
  it(`when first time setFieldState dispatched then stop not fired,
       when second time setFieldState dispatched and fieldState equals then stop fired`, () => {
    return expectSaga(checkEnd)
      .withState(preloadedState)
      .dispatch(actions.setFieldState([0, 0, 0, 0]))
      .select(getFieldState)
      .call(checkEquality, null, [0, 0, 0, 0])
      .not.put(actions.play())
      .dispatch(actions.setFieldState([0, 0, 0, 0]))
      .select(getFieldState)
      .call(checkEquality, [0, 0, 0, 0], [0, 0, 0, 0])
      .put(actions.stop())
      .silentRun();
  });
});
