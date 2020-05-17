import React, { FC } from "react";
import type { HandlerControllerEvent } from "types/menu";
import { HandlerNameType } from "types/game";
import { BaseEntrance, entranceLabelColor } from "./Entrance.styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface EntranceProps {
  username: string;
  eventHandler: (event: HandlerControllerEvent, name: HandlerNameType) => void;
}

export const Entrance: FC<EntranceProps> = ({ username, eventHandler }) => (
  <BaseEntrance>
    <form>
      <label css={entranceLabelColor}>
        Please, enter your name:
        <input
          className="username_input"
          name="username"
          type="text"
          value={username}
          onChange={(ev) => eventHandler(ev, "handleUsername")}
        />
      </label>
      <button
        className="submit_username_button"
        onClick={(ev) => eventHandler(ev, "submitUsername")}
      >
        submit
      </button>
    </form>
  </BaseEntrance>
);
