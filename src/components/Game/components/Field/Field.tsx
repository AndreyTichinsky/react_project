import React, { FC } from "react";
import styled from "@emotion/styled";
import type { FieldProps } from "types/field";

import { Cell } from "./components";

interface FieldWrapperStyle {
  cellSize: number;
  field: boolean[][];
}

const FieldWrapper = styled.div<FieldWrapperStyle>`
  position: relative;
  width: ${(props: FieldWrapperStyle) =>
    props.cellSize * props.field[0].length}px;
  height: ${(props: FieldWrapperStyle) =>
    props.cellSize * props.field.length}px;
  border: 1px solid #000;
`;

export const Field: FC<FieldProps> = ({ field, onClick, cellSize }) => (
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
        />
      )),
    ])}
  </FieldWrapper>
);
