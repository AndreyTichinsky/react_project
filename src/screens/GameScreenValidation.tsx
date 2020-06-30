import React from "react";
import { RawGame } from "@/screens/RawGame";
import { Route, useParams, Redirect } from "react-router-dom";

export const GameScreenValidation: React.FC<{}> = () => {
  const { username } = useParams();
  const storedData = localStorage.getItem("GameOfLife");
  if (!(storedData && JSON.parse(storedData).username === username)) {
    return <Redirect to={`/notloggedin/${username}`} />;
  }
  return <Route path={`/users/:username`} component={RawGame} />;
};
