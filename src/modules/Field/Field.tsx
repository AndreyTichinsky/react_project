import React, { FC } from "react";
import { FieldWrapper } from "./Field.styled";
import { connect } from "react-redux";
import { State } from "@/redux/store";

import { Cell } from "./Cell";

export interface FieldProps {
  field: boolean[][];
  cellSize: number;
}

const mapStateToProps = (state: State) => ({
  field: state.game.fieldState,
  cellSize: state.game.cellSize,
});

export const FieldComponent: FC<FieldProps> = ({ field, cellSize }) => (
  <FieldWrapper cellSize={cellSize} field={field}>
    {field.map((row, y) => [
      ...row.map((_, x) => <Cell key={`${y}_${x}`} x={x} y={y} />),
    ])}
  </FieldWrapper>
);

export const Field = connect(mapStateToProps)(FieldComponent);
