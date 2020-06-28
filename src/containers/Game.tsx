import { connect } from "react-redux";
import { Game } from "@/components/Game/Game";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  xSize: state.xSize,
  ySize: state.ySize,
  cellSize: state.cellSize,
  initialPercent: state.initialPercent,
  updateSpeed: state.updateSpeed,
  gameInProgress: state.gameInProgress,
  fieldState: state.fieldState,
});

export default connect(mapStateToProps)(Game);
