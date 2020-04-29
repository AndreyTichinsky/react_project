import React from "react";
import ReactDOM from "react-dom";

import { Game, Field } from "./components/";

ReactDOM.render(
  <Game
    xSize={10}
    ySize={10}
    cellSize={50}
    fieldComponent={Field}
    updateSpeed={500}
    gameInProgress={false}
  />,
  document.getElementById("root")
);
