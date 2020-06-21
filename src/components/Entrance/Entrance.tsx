import React, { FC } from "react";
import type { HandlerControllerEvent } from "types/menu";
import { BaseEntrance, entranceLabelColor } from "./Entrance.styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface EntranceProps {
  username: string;
  submitHandler: (ev: HandlerControllerEvent) => void;
  handleUsername: (name: string) => void;
}

export const Entrance: FC<EntranceProps> = (props) => (
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
