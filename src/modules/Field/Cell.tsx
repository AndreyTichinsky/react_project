import React, { FC, useCallback } from "react";
import { CellItem } from "./CellItem";
import { connect } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { State } from "@/redux/store";
import { actions } from "@/modules/Game/reducer";
import {
  makeConvertSpeedToNumber,
  makeGetAlive,
} from "@/modules/Game/selectors";

export interface CellProps {
  isAlive: boolean;
  x: number;
  y: number;
  animationSpeed: number;
  idx: number;
}

const makeMapStateToProps = () => {
  const convertSpeedToNumber = makeConvertSpeedToNumber();
  const getAlive = makeGetAlive();
  const mapStateToProps = (state: State, props: any) => {
    return {
      isAlive: !!getAlive(state, props),
      animationSpeed: convertSpeedToNumber(state),
    };
  };
  return mapStateToProps;
};

export const CellComponent: FC<CellProps & { dispatch: AppDispatch }> = (
  props
) => {
  const onClick = useCallback(() => {
    props.dispatch(actions.setCellState(props.idx));
  }, []);
  return (
    <CellItem
      className={`cell cell_${props.y}_${props.x}`}
      isAlive={props.isAlive}
      y={props.y}
      x={props.x}
      onClick={onClick}
      animationSpeed={props.animationSpeed}
    />
  );
};

export const Cell = connect(makeMapStateToProps)(CellComponent);
