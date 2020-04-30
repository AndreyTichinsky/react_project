import React from "react";
import type { BooleanMatrix } from "types/game";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

type FieldComponentInterface = React.FC<{
  field: BooleanMatrix;
  cellSize: number;
  onClick: (x: number, y: number) => void;
}>;

interface GameProps {
  xSize: number;
  ySize: number;
  cellSize: number;
  updateSpeed: number;
  gameInProgress: boolean;
  fieldComponent: FieldComponentInterface;
}
interface GameState {
  xSize: number;
  ySize: number;
  updateSpeed: number;
  initialPercent: number;
  gameInProgress: boolean;
  fieldState: BooleanMatrix;
}

const makeMatrix = (y: number, x: number, empty: boolean): BooleanMatrix => {
  return Array.from({ length: y }).map(() => {
    return Array.from({ length: x }).map(() => {
      return empty ? false : Math.random() > 0.5;
    });
  }) as BooleanMatrix;
};

const mergeMatrices = (
  oldMatrix: BooleanMatrix,
  newMatrix: BooleanMatrix
): BooleanMatrix => {
  const aLenX = oldMatrix[0].length,
    aLenY = oldMatrix.length,
    bLenX = newMatrix[0].length,
    bLenY = newMatrix.length,
    copyA = oldMatrix.map((row) => [...row]),
    copyB = newMatrix.map((row) => [...row]);
  let mainArr: BooleanMatrix = copyA,
    secArr: BooleanMatrix = copyB;
  if (aLenY >= bLenY) {
    copyA.splice(bLenY);
  } else if (aLenY < bLenY) {
    mainArr = copyB;
    secArr = copyA;
  }
  let result: BooleanMatrix;
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

const matrixSum = (matrix: BooleanMatrix): number => {
  return matrix.reduce((mainAcc, row) => {
    return (
      mainAcc +
      row.reduce((subAcc, el) => {
        return subAcc + Number(el);
      }, 0)
    );
  }, 0);
};

const calculatePercentage = (matrix: BooleanMatrix): number => {
  return Math.floor(
    (matrixSum(matrix) / (matrix.length * matrix[0].length)) * 100
  );
};

export const isNumber = (item: number): boolean => !Number.isNaN(item);

const assertSizeValue = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

const assertZero = (value: number | null): boolean => {
  console.warn("Warning: size must be positive non-zero number");
  return value !== null && value !== 0;
};

export class Game extends React.Component<GameProps, GameState> {
  private FieldComponent: FieldComponentInterface;
  private timerId: any;
  constructor(props: GameProps) {
    super(props);
    this.FieldComponent = props.fieldComponent;
    this.state = {
      initialPercent: 0,
      xSize: props.xSize,
      ySize: props.ySize,
      updateSpeed: props.updateSpeed,
      gameInProgress: props.gameInProgress,
      fieldState: makeMatrix(props.ySize, props.xSize, true),
    };
    this.timerId = null;
  }

  componentDidUpdate(prevProps: GameProps, prevState: GameState) {
    if (
      (prevProps.xSize !== this.props.xSize ||
        prevProps.ySize !== this.props.ySize) &&
      assertZero(this.props.ySize) &&
      assertZero(this.props.xSize)
    ) {
      this.updateMatrix(this.props.xSize, this.props.ySize);
    }
    if (prevProps.updateSpeed !== this.props.updateSpeed) {
      this.setState({
        updateSpeed: this.props.updateSpeed,
      });
    }
    if (prevProps.gameInProgress !== this.props.gameInProgress) {
      this.setState({
        gameInProgress: this.props.gameInProgress,
      });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setNewGeneration() {
    // dummy for next feature
    console.log("In progress");
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  updateMatrix(xSize: number, ySize: number) {
    const newMatrix = makeMatrix(xSize, ySize, false);
    const mergedMatrix = mergeMatrices(this.state.fieldState, newMatrix);
    this.setState({
      xSize,
      ySize,
      fieldState: mergedMatrix,
      initialPercent: calculatePercentage(mergedMatrix),
    });
  }

  handleGenerator = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState((state: GameState) => {
      const newMatrix = makeMatrix(state.xSize, state.ySize, false);
      return {
        fieldState: newMatrix,
        initialPercent: calculatePercentage(newMatrix),
      };
    });
  };

  handleProgress = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      gameInProgress: !this.state.gameInProgress,
    });
    if (this.state.gameInProgress) {
      clearInterval(this.timerId);
      this.timerId = null;
      return;
    }
    this.timerId = setInterval(
      this.setNewGeneration.bind(this),
      this.state.updateSpeed
    );
  };

  handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !assertSizeValue(this.state.xSize) ||
      !assertSizeValue(this.state.ySize)
    ) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    this.updateMatrix(this.state.xSize, this.state.ySize);
  };

  handleXSizeChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    if (!isNumber(target.value)) {
      throw new Error("Not a number");
    }
    this.setState({
      xSize: Number(target.value),
    });
  };

  handleYSizeChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    if (!isNumber(target.value)) {
      throw new Error("Not a number");
    }
    this.setState({
      ySize: Number(target.value),
    });
  };

  public onClick = (x: number, y: number) => {
    this.setState((state) => {
      const fieldStateCopy = state.fieldState.map((row) => [...row]);
      fieldStateCopy[y][x] = !fieldStateCopy[y][x];
      return {
        fieldState: fieldStateCopy,
      };
    });
  };

  render() {
    const FieldComponent = this.FieldComponent;
    return (
      <>
        <form
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <div>Percent of filled cells: {this.state.initialPercent}%</div>
          <label>
            xSize:
            <input
              name="xSize"
              type="text"
              value={this.state.xSize}
              onChange={this.handleXSizeChange}
            />
          </label>
          <label>
            ySize:
            <input
              name="ySize"
              type="text"
              value={this.state.ySize}
              onChange={this.handleYSizeChange}
            />
          </label>
          <button
            className="update_button"
            onClick={this.handleUpdate}
            css={css`
              width: 152px;
            `}
          >
            Update
          </button>
          <button
            className="progress_button"
            onClick={this.handleProgress}
            css={css`
              width: 152px;
            `}
          >
            {this.state.gameInProgress ? "Stop" : "Start"}
          </button>
          <button
            className="generator_button"
            onClick={this.handleGenerator}
            css={css`
              width: 152px;
            `}
          >
            Generate new generation
          </button>
        </form>
        <FieldComponent
          field={this.state.fieldState}
          onClick={this.onClick}
          cellSize={this.props.cellSize}
        />
      </>
    );
  }
}
