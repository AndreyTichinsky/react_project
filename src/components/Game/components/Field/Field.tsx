import React, { FC } from "react";
import { FieldWrapper } from "./Field.styled";

import Cell from "@/containers/Cell";

export interface FieldProps {
  field: boolean[][];
  cellSize: number;
}

export const Field: FC<FieldProps> = ({ field, cellSize }) => (
  <FieldWrapper cellSize={cellSize} field={field}>
    {field.map((row, y) => [
      ...row.map((_, x) => <Cell key={`${y}_${x}`} x={x} y={y} />),
    ])}
  </FieldWrapper>
);
