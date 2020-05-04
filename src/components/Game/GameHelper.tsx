import type { BooleanMatrix } from "types/game";

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
  const cellsAmount = x * y,
    filledCellsAmount = Math.round((filledPercent * cellsAmount) / 100),
    percentStep = 100 / cellsAmount,
    emptyCellsArr: number[][] = [];
  let filledCells = 0;
  let coef = filledPercent;
  const rawArray = Array.from({ length: y }).map((row, i) => {
    return Array.from({ length: x }).map((cell, j) => {
      if (filledCells === filledCellsAmount) {
        return false;
      }
      let result = false;
      if (coef >= Math.floor(Math.random() * 101)) {
        result = true;
        filledCells++;
        coef -= percentStep;
      } else {
        emptyCellsArr.push([i, j]);
        coef += percentStep;
      }
      return result;
    });
  });
  if (filledCells < filledCellsAmount) {
    const toggleArray = generateRandomToggleArray(
      emptyCellsArr,
      filledCellsAmount - filledCells
    );
    toggleArray.forEach(([i, j]) => {
      rawArray[i][j] = !rawArray[i][j];
    });
  }
  return rawArray;
};

export const makeEmptyMatrix = (y: number, x: number): BooleanMatrix => {
  return Array.from({ length: y }).map(() => {
    return Array.from({ length: x }).map(() => {
      return false;
    });
  });
};

export const generateRandomToggleArray = (
  array: number[][],
  amountDiff: number
) => {
  const arrLen = array.length,
    step = Math.floor(arrLen / amountDiff),
    result = [];
  for (let i = 0; i < arrLen; i += step) {
    if (amountDiff > result.length) {
      if (arrLen <= i + step) {
        result.push(array[i]);
      } else {
        const randomId = Math.floor(Math.random() * step);
        result.push(array[i + randomId]);
      }
    }
  }
  return result;
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
  } else if (aLenY < bLenY) {
    mainArr = copyB;
  }
  if (aLenX >= bLenX) {
    mainArr = mainArr.map((row, i) => {
      if (copyA[i] && copyB[i]) {
        return copyA[i].slice(0, bLenX);
      }
      return mainArr[i];
    });
  } else if (aLenX < bLenX) {
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

export const isNumber = (item: number): boolean => !Number.isNaN(item);

export const assertSizeValue = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

export const assertZero = (value: number | null): boolean => {
  console.warn("Warning: size must be positive non-zero number");
  return value !== null && value !== 0;
};

export const assertPercentValue = (value: number): boolean => {
  return value >= 0 && value <= 100;
};
