import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface GameWrapperStyle {
  xSize: number;
  cellSize: number;
}

export const GameWrapper = styled.div`
  min-height: 500px;
  background-color: #fff;
  position: relative;
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: ${(props: GameWrapperStyle) => props.xSize * props.cellSize}px;
`;
