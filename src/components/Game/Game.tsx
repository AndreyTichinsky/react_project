import React from "react";
import { Field, Menu, Entrance } from "./components";
import * as helper from "./GameHelper";
import type { BooleanMatrix, HandlerNameType } from "types/game";
import type { HandlerControllerEvent } from "types/menu";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GameWrapper, gameFieldset, progressButton } from "./Game.styled";

interface GameProps {
  xSize: number;
  ySize: number;
  cellSize: number;
  updateSpeed: string;
  gameInProgress: boolean;
  nameIsSubmited: boolean;
  [index: string]: any;
}

interface GameState {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  username: string;
  nameIsSubmited: boolean;
  fieldState: BooleanMatrix;
  [index: string]: any;
}

interface Speed {
  [index: string]: number;
}

export interface Cache {
  [index: string]: number[][];
}

export class Game extends React.Component<GameProps, GameState> {
  private timerId: any;
  [index: string]: any;
  private speed: Speed;
  private cachedNeighbours: Cache;
  constructor(props: GameProps) {
    super(props);
    this.state = {
      username: "Guest",
      initialPercent: 0,
      xSize: props.xSize,
      ySize: props.ySize,
      updateSpeed: props.updateSpeed,
      gameInProgress: props.gameInProgress,
      nameIsSubmited: props.nameIsSubmited,
      fieldState: helper.makeMatrix(props.ySize, props.xSize, 0),
    };
    this.speed = {
      slow: 500,
      normal: 350,
      fast: 200,
    };
    this.timerId = null;
    this.cachedNeighbours = {};
  }

  componentDidMount() {
    this.cachedNeighbours = helper.cacheNeighbours(this.state.fieldState);
  }

  componentDidUpdate(prevProps: GameProps) {
    if (
      (prevProps.xSize !== this.props.xSize ||
        prevProps.ySize !== this.props.ySize) &&
      helper.assertZero(this.props.ySize) &&
      helper.assertZero(this.props.xSize)
    ) {
      this.updateMatrixAndSave(this.props.xSize, this.props.ySize);
    }
    this.updateStateIfPropsDifferent(prevProps, this.props, "updateSpeed");
    this.updateStateIfPropsDifferent(prevProps, this.props, "gameInProgress");
    this.updateStateIfPropsDifferent(prevProps, this.props, "nameIsSubmited");
    this.updateStateIfPropsDifferent(prevProps, this.props, "initialPercent");
  }

  updateStateIfPropsDifferent(
    prevProps: GameProps,
    curProps: GameProps,
    compareProp: string
  ) {
    if (prevProps[compareProp] !== curProps[compareProp]) {
      this.setState({
        [compareProp]: curProps[compareProp],
      });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setNewGeneration() {
    // dummy for next feature
    console.log("In progress");
    this.setState((state) => {
      return {
        fieldState: helper.generationGenerator(
          state.fieldState,
          this.cachedNeighbours
        ),
      };
    });
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  getMergedMatrix(xSize: number, ySize: number) {
    const newMatrix = helper.makeMatrix(ySize, xSize, 0);
    return helper.mergeMatrices(this.state.fieldState, newMatrix);
  }

  updateMatrixAndSave(xSize: number, ySize: number) {
    const mergedMatrix = this.getMergedMatrix(xSize, ySize);
    this.setState({
      xSize,
      ySize,
      fieldState: mergedMatrix,
    });
  }

  handlerController = (
    event: HandlerControllerEvent,
    handlerName: HandlerNameType
  ): void => {
    switch (handlerName) {
      case "handleXSizeChange":
      case "handleYSizeChange":
        this.handleSize(event, handlerName);
        break;
      default:
        this[handlerName](event);
        break;
    }
  };

  handleUsername = (event: HandlerControllerEvent) => {
    const target = event.target as HTMLFormElement;
    this.setState({
      username: target.value,
    });
  };

  submitUsername = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.setState({
      nameIsSubmited: true,
    });
  };

  handleFilledPercent = (event: HandlerControllerEvent) => {
    const target = event.target as HTMLFormElement;
    if (!helper.isNumber(target.value)) {
      throw new Error("Not a number");
    }
    if (!helper.assertPercentValue(target.value)) {
      throw new Error("Value must be between 0 and 100");
    }
    this.setState({
      initialPercent: Number(target.value),
    });
  };

  handleGenerator = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.setState((state: GameState) => {
      const newMatrix = helper.makeMatrix(
        state.ySize,
        state.xSize,
        this.state.initialPercent
      );
      return {
        fieldState: newMatrix,
      };
    });
  };

  handleProgress = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.setState({
      gameInProgress: !this.state.gameInProgress,
    });
    if (this.state.gameInProgress) {
      this.clearTimer();
      return;
    }
    this.timerId = setInterval(
      this.setNewGeneration.bind(this),
      this.speed[this.state.updateSpeed]
    );
  };

  handleUpdate() {
    if (
      !helper.assertSizeValue(this.state.xSize) ||
      !helper.assertSizeValue(this.state.ySize)
    ) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    this.updateMatrixAndSave(this.state.xSize, this.state.ySize);
  }

  handleSize = (event: HandlerControllerEvent, handlerName: string) => {
    const target = event.target as HTMLFormElement;
    const value = Number(target.value);
    if (!helper.isNumber(value)) {
      throw new Error("Not a number");
    }
    if (!helper.assertSizeValue(value)) {
      this.setState(() => {
        let prop = "ySize";
        if (handlerName === "handleXSizeChange") prop = "xSize";
        return {
          [prop]: value,
        };
      });
      throw new Error("invalid value: size must be positive non-zero number");
    }
    switch (handlerName) {
      case "handleYSizeChange":
        this.setState((state) => {
          return this.updateStateMatrix(state.xSize, value);
        });
        break;
      case "handleXSizeChange":
        this.setState((state) => {
          return this.updateStateMatrix(value, state.ySize);
        });
        break;
    }
  };

  updateStateMatrix(x: number, y: number) {
    const matrix = this.getMergedMatrix(x, y);
    this.cachedNeighbours = helper.cacheNeighbours(matrix);
    return { ySize: y, xSize: x, fieldState: matrix };
  }

  selectHandler = (event: HandlerControllerEvent) => {
    const target = event.target as HTMLFormElement;
    this.setState((state) => {
      if (state.gameInProgress) {
        this.clearTimer();
        this.timerId = setInterval(
          this.setNewGeneration.bind(this),
          this.speed[target.value]
        );
      }
      return {
        updateSpeed: target.value,
      };
    });
  };

  handleReset = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.setState((state) => {
      return {
        fieldState: helper.makeMatrix(state.ySize, state.xSize, 0),
        initialPercent: 0,
      };
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
    return (
      <GameWrapper cellSize={this.props.cellSize} xSize={this.props.xSize}>
        <Menu
          initialPercent={this.state.initialPercent}
          xSize={this.state.xSize}
          ySize={this.state.ySize}
          eventHandler={this.handlerController}
          isDisabled={this.state.gameInProgress || !this.state.nameIsSubmited}
        />
        <Field
          field={this.state.fieldState}
          onClick={this.onClick}
          cellSize={this.props.cellSize}
          animationSpeed={this.speed[this.state.updateSpeed]}
        />
        <fieldset css={gameFieldset} disabled={!this.state.nameIsSubmited}>
          <form>
            <button
              className="progress_button"
              onClick={this.handleProgress}
              css={progressButton}
            >
              {this.state.gameInProgress ? "Stop" : "Start"}
            </button>
            <label>
              Speed:
              <select
                className="speed_select"
                value={this.state.updateSpeed}
                onChange={this.selectHandler}
              >
                <option value="slow">slow</option>
                <option value="normal">normal</option>
                <option value="fast">fast</option>
              </select>
            </label>
          </form>
        </fieldset>
        {this.state.nameIsSubmited || (
          <Entrance
            username={this.state.username}
            eventHandler={this.handlerController}
          />
        )}
      </GameWrapper>
    );
  }
}
