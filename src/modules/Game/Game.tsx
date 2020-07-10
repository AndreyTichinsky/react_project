import React, { Component } from "react";
import { Field, Menu, LogoutForm, StartForm } from "@/modules";
import * as helper from "./GameHelper";
import { Cache } from "./Game.interface";
import type { FieldData, HandlerNameType } from "types/game";
import type { HandlerControllerEvent } from "types/menu";
import { GameWrapper } from "./Game.styled";
import { AppDispatch, State } from "@/redux/store";
import { actions } from "./reducer";
import { connect } from "react-redux";

const mapStateToProps = (state: State) => ({
  xSize: state.game.xSize,
  ySize: state.game.ySize,
  cellSize: state.game.cellSize,
  initialPercent: state.game.initialPercent,
  updateSpeed: state.game.updateSpeed,
  gameInProgress: state.game.gameInProgress,
  fieldState: state.game.fieldState,
});

interface GameProps {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  cellSize: number;
  fieldState: FieldData;
  dispatch: AppDispatch;
  onLogout: (ev: React.FormEvent) => void;
  [index: string]: any;
}

interface Speed {
  [index: string]: number;
}

export class GameComponent extends Component<GameProps, {}> {
  private timerId: any;
  [index: string]: any;
  private speed: Speed;
  private cachedNeighbours: Cache;
  constructor(props: GameProps) {
    super(props);
    this.speed = {
      slow: 500,
      normal: 350,
      fast: 200,
    };
    this.dispatch = this.props.dispatch;
    this.timerId = null;
    this.cachedNeighbours = {};
  }

  componentDidMount() {
    this.cachedNeighbours = helper.cacheNeighbours(
      this.props.fieldState,
      this.props.ySize,
      this.props.xSize
    );
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  componentDidUpdate(prevProps: GameProps) {
    if (prevProps.gameInProgress && !this.props.gameInProgress) {
      this.clearTimer();
    }
  }

  setNewGeneration() {
    this.dispatch(
      actions.updateFieldState(
        helper.generationGenerator(this.props.fieldState, this.cachedNeighbours)
      )
    );
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  getMergedMatrix(xSize: number, ySize: number) {
    return helper.mergeMatrices(
      this.props.fieldState,
      this.props.ySize,
      this.props.xSize,
      ySize,
      xSize
    );
  }

  updateMatrixAndSave(xSize: number, ySize: number) {
    const mergedMatrix = this.getMergedMatrix(xSize, ySize);
    this.dispatch(
      actions.setAnyState({
        xSize,
        ySize,
        fieldState: mergedMatrix,
      })
    );
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

  handleFilledPercent = (event: HandlerControllerEvent) => {
    const target = event.target as HTMLFormElement;
    if (!helper.isNumber(Number(target.value))) {
      throw new Error("Not a number");
    }
    if (!helper.assertPercentValue(Number(target.value))) {
      throw new Error("Value must be between 0 and 100");
    }
    this.dispatch(actions.setInitialPercent(Number(target.value)));
  };

  handleGenerator = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.dispatch(
      actions.setFieldState(
        helper.makeMatrix(
          this.props.ySize,
          this.props.xSize,
          this.props.initialPercent
        )
      )
    );
  };

  handleProgress = (event: HandlerControllerEvent) => {
    event.preventDefault();
    if (this.props.gameInProgress) {
      this.dispatch(actions.stop());
    } else {
      this.dispatch(actions.play());
    }
    if (this.props.gameInProgress) {
      this.clearTimer();
      return;
    }
    this.timerId = setInterval(
      this.setNewGeneration.bind(this),
      this.speed[this.props.updateSpeed]
    );
  };

  handleUpdate() {
    if (
      !helper.assertSizeValue(this.props.xSize) ||
      !helper.assertSizeValue(this.props.ySize)
    ) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    this.updateMatrixAndSave(this.props.xSize, this.props.ySize);
  }

  handleSize = (event: HandlerControllerEvent, handlerName: string) => {
    const target = event.target as HTMLFormElement;
    const value = Number(target.value);
    if (!helper.isNumber(value)) {
      throw new Error("Not a number");
    }
    if (!helper.assertSizeValue(value)) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    switch (handlerName) {
      case "handleYSizeChange":
        this.dispatch(actions.setYSize(value));
        break;
      case "handleXSizeChange":
        this.dispatch(actions.setXSize(value));
        break;
    }
    switch (handlerName) {
      case "handleYSizeChange":
        this.dispatch(
          actions.setFieldState(this.updateStateMatrix(this.props.xSize, value))
        );
        break;
      case "handleXSizeChange":
        this.dispatch(
          actions.setFieldState(this.updateStateMatrix(value, this.props.ySize))
        );
        break;
    }
  };

  updateStateMatrix(x: number, y: number) {
    const matrix = this.getMergedMatrix(x, y);
    this.cachedNeighbours = helper.cacheNeighbours(matrix, y, x);
    return matrix;
  }

  selectHandler = (event: HandlerControllerEvent) => {
    const target = event.target as HTMLFormElement;
    if (this.props.gameInProgress) {
      this.clearTimer();
      this.timerId = setInterval(
        this.setNewGeneration.bind(this),
        this.speed[target.value]
      );
    }
    this.dispatch(actions.setSpeed(target.value));
  };

  handleReset = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.dispatch(
      actions.reset(helper.makeMatrix(this.props.ySize, this.props.xSize, 0))
    );
  };

  render() {
    return (
      <GameWrapper cellSize={this.props.cellSize} xSize={this.props.xSize}>
        <LogoutForm onLogout={this.props.onLogout} />
        <Menu eventHandler={this.handlerController} />
        <Field />
        <StartForm
          handleProgress={this.handleProgress}
          selectHandler={this.selectHandler}
        />
      </GameWrapper>
    );
  }
}

export const Game = connect(mapStateToProps)(GameComponent);
