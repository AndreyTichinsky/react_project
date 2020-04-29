import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

const BaseCell = css`
  position: absolute;
  border: 1px solid #000;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
`;

const aliveCell = css`
  background-color: #000000;
`;

const deathCell = css`
  background-color: #ffffff;
`;

interface Props {
  isAlive: boolean;
  cellSize: number;
  x: number;
  y: number;
  decideWhichAnimation: boolean;
}

export const CellItem = styled.div`
  width: ${({ cellSize }: Props) => cellSize}px;
  height: ${({ cellSize }: Props) => cellSize}px;
  top: ${({ cellSize, y }: Props) => cellSize * y}px;
  left: ${({ cellSize, x }: Props) => cellSize * x}px;
  ${BaseCell};
  ${({ decideWhichAnimation }: Props) => {
    return decideWhichAnimation ? aliveCell : deathCell;
  }};
`;
