import React from "react";
import * as helper from "./GameHelper";
import type { BooleanMatrix } from "types/game";
import type { HandlerControllerEvent } from "types/menu";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

type FieldComponentInterface = React.FC<{
  field: BooleanMatrix;
  cellSize: number;
  onClick: (x: number, y: number) => void;
}>;

type MenuComponentInterface = React.FC<{
  initialPercent: number;
  xSize: number;
  ySize: number;
  isDisabled: boolean;
  eventHandler: (ev: HandlerControllerEvent, name: string) => void;
}>;

type EntranceComponentInterface = React.FC<{
  username: string;
  eventHandler: (ev: HandlerControllerEvent, name: string) => void;
}>;

interface GameProps {
  xSize: number;
  ySize: number;
  cellSize: number;
  updateSpeed: string;
  gameInProgress: boolean;
  nameIsSubmited: boolean;
  fieldComponent: FieldComponentInterface;
  menuComponent: MenuComponentInterface;
  entranceComponent: EntranceComponentInterface;
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
}

interface GameWrapperStyle {
  xSize: number;
  cellSize: number;
}

interface Speed {
  [index: string]: number;
}

const GameWrapper = styled.div`
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

export class Game extends React.Component<GameProps, GameState> {
  private FieldComponent: FieldComponentInterface;
  private MenuComponent: MenuComponentInterface;
  private EntranceComponent: EntranceComponentInterface;
  private timerId: any;
  [index: string]: any;
  private speed: Speed;
  constructor(props: GameProps) {
    super(props);
    this.FieldComponent = props.fieldComponent;
    this.MenuComponent = props.menuComponent;
    this.EntranceComponent = props.entranceComponent;
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
  }

  componentDidUpdate(prevProps: GameProps) {
    if (
      (prevProps.xSize !== this.props.xSize ||
        prevProps.ySize !== this.props.ySize) &&
      helper.assertZero(this.props.ySize) &&
      helper.assertZero(this.props.xSize)
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
    if (prevProps.nameIsSubmited !== this.props.nameIsSubmited) {
      this.setState({
        nameIsSubmited: this.props.nameIsSubmited,
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
    const newMatrix = helper.makeMatrix(ySize, xSize, 0);
    const mergedMatrix = helper.mergeMatrices(this.state.fieldState, newMatrix);
    this.setState({
      xSize,
      ySize,
      fieldState: mergedMatrix,
    });
  }

  handlerController = (
    event: HandlerControllerEvent,
    handlerName: string
  ): void => {
    this[handlerName](event);
  };

  handleUsername = (event: React.ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    this.setState({
      username: target.value,
    });
  };

  submitUsername = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      nameIsSubmited: true,
    });
  };

  handleFilledPercent = (event: React.ChangeEvent) => {
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

  handleGenerator = (event: React.FormEvent) => {
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

  handleProgress = (event: React.FormEvent) => {
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

  handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !helper.assertSizeValue(this.state.xSize) ||
      !helper.assertSizeValue(this.state.ySize)
    ) {
      throw new Error("invalid value: size must be positive non-zero number");
    }
    this.updateMatrix(this.state.xSize, this.state.ySize);
  };

  handleXSizeChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    if (!helper.isNumber(target.value)) {
      throw new Error("Not a number");
    }
    this.setState({
      xSize: Number(target.value),
    });
  };

  handleYSizeChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    if (!helper.isNumber(target.value)) {
      throw new Error("Not a number");
    }
    this.setState({
      ySize: Number(target.value),
    });
  };

  selectHandler = (event: React.ChangeEvent) => {
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

  handleReset = (event: React.FormEvent) => {
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
    const FieldComponent = this.FieldComponent;
    const MenuComponent = this.MenuComponent;
    const EntranceComponent = this.EntranceComponent;
    return (
      <GameWrapper cellSize={this.props.cellSize} xSize={this.props.xSize}>
        <MenuComponent
          initialPercent={this.state.initialPercent}
          xSize={this.state.xSize}
          ySize={this.state.ySize}
          eventHandler={this.handlerController}
          isDisabled={this.state.gameInProgress || !this.state.nameIsSubmited}
        />
        <FieldComponent
          field={this.state.fieldState}
          onClick={this.onClick}
          cellSize={this.props.cellSize}
        />
        <fieldset
          disabled={this.state.gameInProgress || !this.state.nameIsSubmited}
        >
          <form>
            <button
              className="progress_button"
              onClick={this.handleProgress}
              css={css`
                width: 100px;
                margin-right: 10px;
              `}
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
          <EntranceComponent
            username={this.state.username}
            eventHandler={this.handlerController}
          ></EntranceComponent>
        )}
      </GameWrapper>
    );
  }
}
