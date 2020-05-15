import React from "react";
import ReactDOM from "react-dom";

import { Game } from "./components/";

ReactDOM.render(
  <Game
    xSize={50}
    ySize={50}
    cellSize={10}
    updateSpeed={"slow"}
    gameInProgress={false}
    nameIsSubmited={false}
  />,
  document.getElementById("root")
);
