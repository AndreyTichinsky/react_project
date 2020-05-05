import React from "react";
import ReactDOM from "react-dom";

import { Game } from "./components/";

ReactDOM.render(
  <Game
    xSize={20}
    ySize={20}
    cellSize={20}
    updateSpeed={"slow"}
    gameInProgress={false}
    nameIsSubmited={false}
  />,
  document.getElementById("root")
);
