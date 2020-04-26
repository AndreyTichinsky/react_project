import React from "react";
import ReactDOM from "react-dom";

import { Game, Field } from "./components/";

ReactDOM.render(
  <Game xSize={2} ySize={2} cellSize={50} fieldComponent={Field} />,
  document.getElementById("root")
);
