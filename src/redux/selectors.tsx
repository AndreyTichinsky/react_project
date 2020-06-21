import { createSelector } from "reselect";
import { State } from "./reducers";
import { BooleanMatrix } from "@/types/game";

const getFieldUpdateSpeed = (state: State) => state.updateSpeed;
const getFieldState = (state: State, props: any) => state.fieldState;
const getCellProps = (state: State, props: any) => props;

interface Speed {
  [index: string]: number;
}
export const makeConvertSpeedToNumber = () => {
  return createSelector([getFieldUpdateSpeed], (updateSpeed: string) => {
    const speed: Speed = {
      slow: 500,
      normal: 350,
      fast: 200,
    };
    return speed[updateSpeed];
  });
};

export const makeGetAlive = () => {
  return createSelector(
    [getFieldState, getCellProps],
    (fieldState: BooleanMatrix, props: any) => {
      return fieldState[props.y][props.x];
    }
  );
};
