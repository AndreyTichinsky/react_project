import styled from "@emotion/styled";

interface FieldWrapperStyle {
  xSize: number;
  ySize: number;
}

export const FieldWrapper = styled.div<FieldWrapperStyle>`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${(props: FieldWrapperStyle) => 10 * props.xSize}px;
  height: ${(props: FieldWrapperStyle) => 10 * props.ySize}px;
  border: 1px solid #000;
`;
