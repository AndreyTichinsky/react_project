import React, { FC, useCallback } from "react";
import { CellItem } from "./CellItem";
import { connect } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { State } from "@/redux/reducers";
import { setCellState } from "@/redux/actions";
import { makeConvertSpeedToNumber, makeGetAlive } from "@/redux/selectors";

export interface CellProps {
  isAlive: boolean;
  x: number;
  y: number;
  cellSize: number;
  animationSpeed: number;
}

const makeMapStateToProps = () => {
  const convertSpeedToNumber = makeConvertSpeedToNumber();
  const getAlive = makeGetAlive();
  const mapStateToProps = (state: State, props: any) => {
    return {
      cellSize: state.cellSize,
      isAlive: getAlive(state, props),
      animationSpeed: convertSpeedToNumber(state),
    };
  };
  return mapStateToProps;
};

export const CellComponent: FC<CellProps & { dispatch: AppDispatch }> = (
  props
) => {
  const onClick = useCallback(() => {
    props.dispatch(setCellState({ x: props.x, y: props.y }));
  }, []);
  return (
    <CellItem
      className={`cell cell_${props.y}_${props.x}`}
      isAlive={props.isAlive}
      x={props.x}
      y={props.y}
      cellSize={props.cellSize}
      onClick={onClick}
      animationSpeed={props.animationSpeed}
    />
  );
};

export const Cell = connect(makeMapStateToProps)(CellComponent);
