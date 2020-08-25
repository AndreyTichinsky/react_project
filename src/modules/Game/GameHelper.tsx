import type { FieldData } from "types/game";
import { Cache } from "./Game.interface";

export const makeMatrix = (
  y: number,
  x: number,
  filledPercent: number
): FieldData => {
  if (filledPercent === 0) {
    return makeEmptyMatrix(y, x);
  }
  return makeFilledMatrix(y, x, filledPercent);
};

const makeFilledMatrix = (
  y: number,
  x: number,
  filledPercent: number
): FieldData => {
  const cellsAmount = x * y;
  const filledCellsAmount = Math.round((filledPercent * cellsAmount) / 100);
  const arrayOfIdxs: number[] = [];
  const ratio = filledCellsAmount / cellsAmount;
  const isFilled = ratio >= 50 ? 1 : 0;
  const rawArray = Array.from({ length: x * y }).map((_, idx) => {
    arrayOfIdxs.push(idx);
    return isFilled;
  });
  const arrayOfFilledCells = shuffle(arrayOfIdxs, filledCellsAmount);
  arrayOfFilledCells.forEach((idx) => {
    rawArray[idx] = rawArray[idx] === 1 ? 0 : 1;
  });
  return rawArray;
};

export const shuffle = (arr: number[], filledCellsAmount: number) => {
  const arrayCopy = arr.slice();
  let currentIdx = arrayCopy.length,
    randomIdx;

  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;

    [arrayCopy[currentIdx], arrayCopy[randomIdx]] = [
      arrayCopy[randomIdx],
      arrayCopy[currentIdx],
    ];
  }

  return arrayCopy.slice(0, filledCellsAmount);
};

export const makeEmptyMatrix = (y: number, x: number): FieldData => {
  return Array.from({ length: x * y }).map(() => {
    return 0;
  });
};

export const mergeMatrices = (
  oldMatrix: FieldData,
  oldY: number,
  oldX: number,
  newY: number,
  newX: number
): FieldData => {
  const copyOld = oldMatrix.slice();
  if (oldY >= newY) {
    copyOld.splice(newY * oldX);
  } else {
    copyOld.splice(
      oldY * oldX,
      0,
      ...Array.from({ length: (newY - oldY) * oldX }).map(() => 0)
    );
  }
  if (newX > oldX) {
    for (let y = newY; 1 <= y; y--) {
      copyOld.splice(
        y * oldX,
        0,
        ...Array.from({ length: newX - oldX }).map(() => 0)
      );
    }
  } else if (newX < oldX) {
    for (let y = newY; 1 <= y; y--) {
      const diff = oldX - newX;
      copyOld.splice(y * oldX - diff, diff);
    }
  }
  return copyOld;
};

export const matrixSum = (matrix: FieldData): number => {
  return matrix.reduce((acc, el) => {
    return acc + el;
  }, 0);
};

export const calculatePercentage = (matrix: FieldData): number => {
  return Math.floor((matrixSum(matrix) / matrix.length) * 100);
};

export const isNumber = (item: any): boolean => {
  return Number.isFinite(item);
};

export const assertSizeValue = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

export const assertPercentValue = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

export const generationGenerator = (
  matrix: FieldData,
  cache: Cache
): FieldData => {
  const nextGenMatrix: FieldData = matrix.map((cell, cellIdx) => {
    let counter = 0;
    let i = 0;
    while (counter < 4 && i < 8) {
      counter += matrix[cache[cellIdx][i]];
      i++;
    }

    return (cell === 1 && (counter === 2 || counter === 3)) ||
      (cell === 0 && counter === 3)
      ? 1
      : 0;
  });
  return nextGenMatrix;
};

export const cacheNeighbours = (matrix: FieldData, y: number, x: number) => {
  const cache: Cache = {};
  matrix.forEach((_, idx) => {
    cache[idx] = getNeighbours(Math.floor(idx / x), idx % x, y, x);
  });
  return cache;
};

export const getNeighbours = (
  y: number,
  x: number,
  yLen: number,
  xLen: number
) => {
  const pattern = [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ];
  const modifiedPattern = pattern.map(([Y, X]) => {
    if (Y >= yLen) Y %= yLen;
    if (X >= xLen) X %= xLen;
    if (Y < 0) Y = yLen + Y;
    if (X < 0) X = xLen + X;
    return [Y, X];
  });
  const convertPattern = modifiedPattern.map(([Y, X]) => {
    return Y * xLen + X;
  });
  return convertPattern;
};
