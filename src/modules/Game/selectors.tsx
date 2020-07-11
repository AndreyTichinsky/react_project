import { createSelector } from "reselect";
import { State } from "@/redux/store";
import { FieldData } from "types/game";

export const getFieldUpdateSpeed = (state: State) => state.game.updateSpeed;
export const getFieldState = (state: State) => state.game.fieldState;
export const getXSizeState = (state: State) => state.game.xSize;
export const getCellProps = (_: State, props: any) => props;

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
    [getFieldState, getCellProps, getXSizeState],
    (fieldState: FieldData, props: any, xSize: number) => {
      return fieldState[props.y * xSize + props.x];
    }
  );
};
