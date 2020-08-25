import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Game, entranceActions, gameActions } from "@/modules";
import { AppDispatch } from "@/redux";

type RawGameProps = {
  dispatch: AppDispatch;
};

export const RawGameComponent: React.FC<RawGameProps> = ({ dispatch }) => {
  const { username } = useParams();
  dispatch(entranceActions.setUsername(username));
  const history = useHistory();
  const onLogout = useCallback((ev) => {
    ev.preventDefault();
    localStorage.removeItem("GameOfLife");
    history.push(`/`);
    dispatch(gameActions.stop());
    dispatch(gameActions.reset());
    dispatch(gameActions.setXSize(5));
    dispatch(gameActions.setYSize(5));
    dispatch(entranceActions.logout());
  }, []);
  return <Game onLogout={onLogout} />;
};

export const RawGame = connect()(RawGameComponent);
