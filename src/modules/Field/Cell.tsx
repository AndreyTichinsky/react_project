import React, { FC, useCallback } from "react";
import { connect } from "react-redux";

import { AppDispatch, State } from "@/redux";
import { gameActions, makeConvertSpeedToNumber, makeGetAlive } from "@/modules";
import { CellItem } from "./CellItem";

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
  const mapStateToProps = (state: State, props: CellProps) => {
    return {
      isAlive: !!getAlive(state, props),
      animationSpeed: convertSpeedToNumber(state),
    };
  };
  return mapStateToProps;
};

const CellComponent: FC<CellProps & { dispatch: AppDispatch }> = (props) => {
  const onClick = useCallback(() => {
    props.dispatch(gameActions.setCellState(props.idx));
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
