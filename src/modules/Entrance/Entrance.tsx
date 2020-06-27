import React, { FC } from "react";
import type { HandlerControllerEvent } from "types/menu";
import { BaseEntrance, entranceLabelColor } from "./Entrance.styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { actions } from "./reducer";
import { AppDispatch, State } from "@/redux/store";

const mapStateToProps = (state: State) => ({
  username: state.entrance.username,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  handleUsername: (username: string) => dispatch(actions.setUsername(username)),
});

export interface EntranceProps {
  username: string;
  submitHandler: (ev: HandlerControllerEvent) => void;
  handleUsername: (name: string) => void;
}

export const EntranceComponent: FC<EntranceProps> = (props) => (
  <BaseEntrance>
    <form onSubmit={props.submitHandler}>
      <label
        css={css`
          ${entranceLabelColor}
        `}
      >
        Please, enter your name:
        <input
          className="username_input"
          name="username"
          type="text"
          value={props.username}
          onChange={(ev) =>
            props.handleUsername((ev.target as HTMLInputElement).value)
          }
        />
      </label>
      <button className="submit_username_button">submit</button>
    </form>
  </BaseEntrance>
);

export const Entrance = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntranceComponent);
