import React, { FC } from "react";
import { connect } from "react-redux";

import { AppDispatch, State } from "@/redux";
import { gameFieldset, progressButton } from "./StartForm.styled";
import { StartFormProps } from "./StartForm.interface";

const mapStateToProps = (state: State) => ({
  gameInProgress: state.game.gameInProgress,
  updateSpeed: state.game.updateSpeed,
});

const StartFormComponent: FC<StartFormProps & { dispatch: AppDispatch }> = (
  props
) => {
  return (
    <fieldset css={gameFieldset}>
      <form>
        <button
          className="progress_button"
          onClick={(ev) => {
            ev.preventDefault();
            props.dispatch({ type: props.actionProgress });
          }}
          css={progressButton}
        >
          {props.gameInProgress ? "Stop" : "Start"}
        </button>
        <label>
          Speed:
          <select
            className="speed_select"
            value={props.updateSpeed}
            onChange={(event) =>
              props.dispatch({
                type: props.actionSelect,
                payload: event.target.value,
              })
            }
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
