import React, { FC, useCallback } from "react";
import { setCellState } from "@/redux/actions";
import { AppDispatch } from "@/redux/store";
import { CellItem } from "./CellItem";

export interface CellProps {
  isAlive: boolean;
  x: number;
  y: number;
  cellSize: number;
  animationSpeed: number;
}

export const Cell: FC<CellProps & { dispatch: AppDispatch }> = (props) => {
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
