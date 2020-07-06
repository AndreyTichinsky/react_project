import styled from "@emotion/styled";
import { css } from "@emotion/core";

const BaseCell = css`
  border: 1px solid #000;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
`;

const aliveCell = css`
  background-color: #000000;
`;

const deathCell = css`
  background-color: #ffffff;
`;

interface Props {
  isAlive: boolean;
  x: number;
  y: number;
  animationSpeed: number;
}

export const CellItem = styled.div`
  ${BaseCell};
  transition: background-color
    ${({ animationSpeed }: Props) => animationSpeed}ms ease;
  ${({ isAlive }: Props) => {
    return isAlive ? aliveCell : deathCell;
  }}
`;
