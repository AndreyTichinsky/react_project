import React, { FC } from "react";
import { Field, Menu, LogoutForm, StartForm } from "@/modules";
import type { FieldData } from "types/index";
import { GameWrapper } from "./Game.styled";
import { AppDispatch, State } from "@/redux";
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

const GameComponent: FC<GameProps> = (props) => (
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
