import React, { useCallback } from "react";
import { Game } from "@/modules/Game";
import { setUsername } from "@/redux/actions";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

export const RawGameComponent: React.FC<{}> = ({ dispatch }: any) => {
  const { username } = useParams();
  dispatch(setUsername(username));
  const history = useHistory();
  const onLogout = useCallback((ev) => {
    ev.preventDefault();
    localStorage.removeItem("GameOfLife");
    history.push(`/`);
  }, []);
  return <Game username={username} onLogout={onLogout} />;
};

export const RawGame = connect()(RawGameComponent);
