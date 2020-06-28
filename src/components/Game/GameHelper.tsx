import type { BooleanMatrix } from "types/game";
import { Cache } from "./Game";

export const makeMatrix = (
  y: number,
  x: number,
  filledPercent: number
): BooleanMatrix => {
  if (filledPercent === 0) {
    return makeEmptyMatrix(y, x);
  }
  return makeFilledMatrix(y, x, filledPercent);
};

export const makeFilledMatrix = (
  y: number,
  x: number,
  filledPercent: number
): BooleanMatrix => {
  const cellsAmount = x * y;
  const filledCellsAmount = Math.round((filledPercent * cellsAmount) / 100);
  const arrayOfIdxs: number[][] = [];
  const ratio = filledCellsAmount / cellsAmount;
  const isFilled = ratio >= 50;
  const rawArray = Array.from({ length: y }).map((row, i) => {
    return Array.from({ length: x }).map((cell, j) => {
      arrayOfIdxs.push([i, j]);
      return isFilled;
    });
  });
  const arrayOfFilledCells = shuffle(arrayOfIdxs, filledCellsAmount);
  arrayOfFilledCells.forEach(([i, j], index) => {
    rawArray[i][j] = !rawArray[i][j];
  });

  return rawArray;
};

export const shuffle = (arr: number[][], filledCellsAmount: number) => {
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

export const makeEmptyMatrix = (y: number, x: number): BooleanMatrix => {
  return Array.from({ length: y }).map(() => {
    return Array.from({ length: x }).map(() => {
      return false;
    });
  });
};

export const mergeMatrices = (
  oldMatrix: BooleanMatrix,
  newMatrix: BooleanMatrix
): BooleanMatrix => {
  const aLenX = oldMatrix[0].length,
    aLenY = oldMatrix.length,
    bLenX = newMatrix[0].length,
    bLenY = newMatrix.length,
    copyA = oldMatrix.map((row) => [...row]),
    copyB = newMatrix.map((row) => [...row]);
  let mainArr: BooleanMatrix = copyA;
  if (aLenY >= bLenY) {
    copyA.splice(bLenY);
  } else {
    mainArr = copyB;
  }
  if (aLenX >= bLenX) {
    mainArr = mainArr.map((row, i) => {
      if (copyA[i] && copyB[i]) {
        return copyA[i].slice(0, bLenX);
      }
      return mainArr[i];
    });
  } else {
    mainArr = mainArr.map((row, i) => {
      if (copyA[i] && copyB[i]) {
        return copyA[i].slice(0, aLenX).concat(copyB[i].slice(aLenX));
      }
      return mainArr[i];
    });
  }
  return mainArr;
};

export const matrixSum = (matrix: BooleanMatrix): number => {
  return matrix.reduce((mainAcc, row) => {
    return (
      mainAcc +
      row.reduce((subAcc, el) => {
        return subAcc + Number(el);
      }, 0)
    );
  }, 0);
};

export const calculatePercentage = (matrix: BooleanMatrix): number => {
  return Math.floor(
    (matrixSum(matrix) / (matrix.length * matrix[0].length)) * 100
  );
};

export const isNumber = (item: number): boolean => {
  return !Number.isNaN(item);
};

export const assertSizeValue = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

export const assertZero = (value: number | null): boolean => {
  return value !== null && value !== 0;
};

export const assertPercentValue = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

export const generationGenerator = (
  matrix: BooleanMatrix,
  cache: Cache
): BooleanMatrix => {
  const nextGenMatrix: BooleanMatrix = matrix.map((row, i) => {
    return row.map((cell, j) => {
      let counter = 0;
      cache[`${i}_${j}`].forEach(([y, x]) => {
        counter += matrix[y][x] ? 1 : 0;
      });

      return (
        (cell && (counter === 2 || counter === 3)) || (!cell && counter === 3)
      );
    });
  });
  return nextGenMatrix;
};

export const cacheNeighbours = (matrix: BooleanMatrix) => {
  const cache: Cache = {};
  const matrixYLen = matrix.length;
  const matrixXLen = matrix[0].length;
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      cache[`${i}_${j}`] = getNeighbours(j, i, matrixXLen, matrixYLen);
    });
  });
  return cache;
};

export const getNeighbours = (
  x: number,
  y: number,
  xLen: number,
  yLen: number
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
  return pattern.map(([Y, X]) => {
    if (Y >= xLen) Y %= xLen;
    if (X >= yLen) X %= yLen;
    if (Y < 0) Y = xLen + Y;
    if (X < 0) X = yLen + X;
    return [Y, X];
  });
};
