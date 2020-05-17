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

export const gameFieldset = css`
  width: 260px;
  height: 24px;
`;

export const progressButton = css`
  width: 100px;
  margin-right: 10px;
`;
