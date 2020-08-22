import React, { FC } from "react";
import { FieldData } from "types/game";
import { FieldWrapper } from "./Field.styled";
import { connect } from "react-redux";
import { State } from "@/redux/store";

import { Cell } from "./Cell";

interface FieldProps {
  field: FieldData;
  ySize: number;
  xSize: number;
}

const mapStateToProps = (state: State) => ({
  field: state.game.fieldState,
  ySize: state.game.ySize,
  xSize: state.game.xSize,
});

export const FieldComponent: FC<FieldProps> = ({ field, ySize, xSize }) => (
  <FieldWrapper xSize={xSize} ySize={ySize}>
    {field.map((_: number, idx: number) => (
      <Cell idx={idx} key={idx} y={Math.floor(idx / xSize)} x={idx % xSize} />
    ))}
  </FieldWrapper>
);

export const Field = connect(mapStateToProps)(FieldComponent);
