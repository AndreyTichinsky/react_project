import styled from "@emotion/styled";

interface FieldWrapperStyle {
  cellSize: number;
  field: boolean[][];
}

export const FieldWrapper = styled.div<FieldWrapperStyle>`
  position: relative;
  width: ${(props: FieldWrapperStyle) =>
    props.cellSize * props.field[0].length}px;
  height: ${(props: FieldWrapperStyle) =>
    props.cellSize * props.field.length}px;
  border: 1px solid #000;
`;
