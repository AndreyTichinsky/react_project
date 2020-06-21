import React, { useCallback } from "react";
import Game from "@/containers/Game";
import { setUsername } from "@/redux/actions";
import { useParams, useHistory } from "react-router-dom";

export const RawGame: React.FC<{}> = ({ dispatch }: any) => {
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
