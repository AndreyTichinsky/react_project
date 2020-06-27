import React, { useCallback } from "react";
import { Game } from "@/modules/Game";
import { actions } from "@/modules/Entrance/reducer";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

export const RawGameComponent: React.FC<{}> = ({ dispatch }: any) => {
  const { username } = useParams();
  dispatch(actions.setUsername(username));
  const history = useHistory();
  const onLogout = useCallback((ev) => {
    ev.preventDefault();
    localStorage.removeItem("GameOfLife");
    history.push(`/`);
    dispatch(actions.setUsername("Guest"));
  }, []);
  return <Game username={username} onLogout={onLogout} />;
};

export const RawGame = connect()(RawGameComponent);
