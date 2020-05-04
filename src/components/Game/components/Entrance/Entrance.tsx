import React, { FC, useState, useCallback } from "react";
import type { HandlerControllerEvent } from "types/menu";
import styled from "@emotion/styled";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export interface EntranceProps {
  username: string;
  eventHandler: (event: HandlerControllerEvent, name: string) => void;
}

const BaseEntrance = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const Entrance: FC<EntranceProps> = ({ username, eventHandler }) => (
  <BaseEntrance>
    <form>
      <label
        css={css`
          color: #ffffff;
        `}
      >
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
        css={css``}
      >
        submit
      </button>
    </form>
  </BaseEntrance>
);
