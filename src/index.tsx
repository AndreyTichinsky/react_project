import React from "react";
import ReactDOM from "react-dom";

import { Game, Field, Menu, Entrance } from "./components/";

ReactDOM.render(
  <Game
    xSize={20}
    ySize={20}
    cellSize={20}
    fieldComponent={Field}
    menuComponent={Menu}
    entranceComponent={Entrance}
    updateSpeed={"slow"}
    gameInProgress={false}
    nameIsSubmited={false}
  />,
  document.getElementById("root")
);
