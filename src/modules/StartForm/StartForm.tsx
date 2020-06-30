import React, { FC } from "react";
import { gameFieldset, progressButton } from "./StartForm.styled";
import { StartFormProps } from "./StartForm.interface";
import { connect } from "react-redux";
import { State } from "@/redux/store";

const mapStateToProps = (state: State) => ({
  gameInProgress: state.game.gameInProgress,
  updateSpeed: state.game.updateSpeed,
});

export const StartFormComponent: FC<StartFormProps> = (props) => {
  return (
    <fieldset css={gameFieldset}>
      <form>
        <button
          className="progress_button"
          onClick={props.handleProgress}
          css={progressButton}
        >
          {props.gameInProgress ? "Stop" : "Start"}
        </button>
        <label>
          Speed:
          <select
            className="speed_select"
            value={props.updateSpeed}
            onChange={props.selectHandler}
          >
            <option value="slow">slow</option>
            <option value="normal">normal</option>
            <option value="fast">fast</option>
          </select>
        </label>
      </form>
    </fieldset>
  );
};

export const StartForm = connect(mapStateToProps)(StartFormComponent);
