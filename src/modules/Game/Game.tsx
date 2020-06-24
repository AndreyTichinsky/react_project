import React, { Component } from "react";
import { Field } from "@/modules/Field";
import { Menu } from "@/modules/Menu";
import { LogoutForm } from "@/modules/LogoutForm";
import { StartForm } from "@/modules/StartForm";
import * as helper from "./GameHelper";
import { Cache } from "./Game.interface";
import type { BooleanMatrix, HandlerNameType } from "types/game";
import type { HandlerControllerEvent } from "types/menu";
import { GameWrapper } from "./Game.styled";
import { AppDispatch } from "@/redux/store";
import {
  setFieldState,
  setInitialPercent,
  setSpeed,
  setProgress,
  setXSize,
  setYSize,
  setAnyState,
  ActionCreator,
} from "@/redux/actions";
import { connect } from "react-redux";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  xSize: state.xSize,
  ySize: state.ySize,
  cellSize: state.cellSize,
  initialPercent: state.initialPercent,
  updateSpeed: state.updateSpeed,
  gameInProgress: state.gameInProgress,
  fieldState: state.fieldState,
});

interface GameProps {
  xSize: number;
  ySize: number;
  updateSpeed: string;
  initialPercent: number;
  gameInProgress: boolean;
  cellSize: number;
  fieldState: BooleanMatrix;
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
    this.cachedNeighbours = helper.cacheNeighbours(this.props.fieldState);
  }

  updateStateIfPropsDifferent({
    prevProps,
    curProps,
    compareProp,
    actionCreator,
  }: {
    prevProps: GameProps;
    curProps: GameProps;
    compareProp: string;
    actionCreator: ActionCreator;
  }) {
    if (prevProps[compareProp] !== curProps[compareProp]) {
      this.dispatch(actionCreator(curProps[compareProp]));
    }
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
    console.log("In progress");
    this.dispatch(
      setFieldState(
        helper.generationGenerator(this.props.fieldState, this.cachedNeighbours)
      )
    );
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
  }

  getMergedMatrix(xSize: number, ySize: number) {
    const newMatrix = helper.makeMatrix(ySize, xSize, 0);
    return helper.mergeMatrices(this.props.fieldState, newMatrix);
  }

  updateMatrixAndSave(xSize: number, ySize: number) {
    const mergedMatrix = this.getMergedMatrix(xSize, ySize);
    this.dispatch(
      setAnyState({
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
    if (!helper.isNumber(target.value)) {
      throw new Error("Not a number");
    }
    if (!helper.assertPercentValue(target.value)) {
      throw new Error("Value must be between 0 and 100");
    }
    this.dispatch(setInitialPercent(Number(target.value)));
  };

  handleGenerator = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.dispatch(
      setFieldState(
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
    this.dispatch(setProgress(!this.props.gameInProgress));
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
    switch (handlerName) {
      case "handleYSizeChange":
        this.dispatch(setYSize(value));
        break;
      case "handleXSizeChange":
        this.dispatch(setXSize(value));
        break;
    }
    if (!helper.assertSizeValue(value)) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    switch (handlerName) {
      case "handleYSizeChange":
        this.dispatch(
          setFieldState(this.updateStateMatrix(this.props.xSize, value))
        );
        break;
      case "handleXSizeChange":
        this.dispatch(
          setFieldState(this.updateStateMatrix(value, this.props.ySize))
        );
        break;
    }
  };

  updateStateMatrix(x: number, y: number) {
    console.warn(x, y);
    const matrix = this.getMergedMatrix(x, y);
    this.cachedNeighbours = helper.cacheNeighbours(matrix);
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
    this.dispatch(setSpeed(target.value));
  };

  handleReset = (event: HandlerControllerEvent) => {
    event.preventDefault();
    this.dispatch(
      setAnyState({
        fieldState: helper.makeMatrix(this.props.ySize, this.props.xSize, 0),
        initialPercent: 0,
      })
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