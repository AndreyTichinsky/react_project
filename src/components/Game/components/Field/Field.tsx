import React, { FC } from "react";
import { FieldWrapper } from "./Field.styled";
import type { FieldProps } from "types/field";

import { Cell } from "./components";

export const Field: FC<FieldProps> = ({
  field,
  onClick,
  cellSize,
  animationSpeed,
}) => (
  <FieldWrapper cellSize={cellSize} field={field}>
    {field.map((row, y) => [
      ...row.map((isAlive: boolean, x) => (
        <Cell
          key={`${y}_${x}`}
          x={x}
          y={y}
          cellSize={cellSize}
          isAlive={isAlive}
          onClick={onClick}
          animationSpeed={animationSpeed}
        />
      )),
    ])}
  </FieldWrapper>
);
