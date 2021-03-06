import React, { FC } from "react";
import { connect } from "react-redux";

import { Field, Menu, LogoutForm, StartForm } from "@/modules";
import type { FieldData } from "types/index";
import { GameWrapper } from "./Game.styled";
import { AppDispatch, State } from "@/redux";
import { actions } from "./reducer";

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
  onLogout: (ev: React.FormEvent) => void;
}

export const GameComponent: FC<
  GameProps & {
    dispatch: AppDispatch;
  }
> = (props) => (
  <GameWrapper cellSize={props.cellSize} xSize={props.xSize}>
    <LogoutForm onLogout={props.onLogout} />
    <Menu />
    <Field />
    <StartForm
      actionSelect={actions.setSpeed.type}
      actionProgress={actions.setProgress.type}
    />
  </GameWrapper>
);

export const Game = connect(mapStateToProps)(GameComponent);
