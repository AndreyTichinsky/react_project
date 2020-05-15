import React, { FC } from "react";
import type { CellProps } from "types/field";
import { CellItem } from "./CellItem";

export const Cell: FC<CellProps> = ({ isAlive, x, y, cellSize, onClick }) => {
  return (
    <CellItem
      className={`cell cell_${y}_${x}`}
      isAlive={isAlive}
      x={x}
      y={y}
      cellSize={cellSize}
      onClick={() => onClick(x, y)}
    />
  );
};
