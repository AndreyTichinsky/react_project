import React from "react";
import { Route, useParams, Redirect } from "react-router-dom";

import { RawGame } from "@/screens";

export const GameScreenValidation: React.FC<{}> = () => {
  const { username } = useParams();
  const storedData = localStorage.getItem("GameOfLife");
  if (!(storedData && JSON.parse(storedData).username === username)) {
    return <Redirect to={`/notloggedin/${username}`} />;
  }
  return <Route path={`/users/:username`} component={RawGame} />;
};
