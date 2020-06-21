import React, { FC } from "react";
import { gameFieldset, progressButton } from "./StartForm.styled";
import type { HandlerControllerEvent } from "types/menu";

export interface StartFormProps {
  gameInProgress: boolean;
  updateSpeed: string;
  handleProgress: (ev: HandlerControllerEvent) => void;
  selectHandler: (ev: HandlerControllerEvent) => void;
}

export const StartForm: FC<StartFormProps> = (props) => {
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
