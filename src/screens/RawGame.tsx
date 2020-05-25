import React, { useCallback } from "react";
import { Game } from "@/components/Game";
import { useParams, useHistory } from "react-router-dom";

export const RawGame: React.FC<{}> = () => {
  const { username } = useParams();
  const history = useHistory();
  const onLogout = useCallback((ev) => {
    ev.preventDefault();
    localStorage.removeItem("GameOfLife");
    history.push(`/`);
  }, []);
  return (
    <Game
      xSize={50}
      ySize={50}
      cellSize={10}
      updateSpeed={"slow"}
      gameInProgress={false}
      username={username}
      onLogout={onLogout}
    />
  );
};
