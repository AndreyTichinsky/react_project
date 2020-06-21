import { connect } from "react-redux";
import { Menu } from "@/components/Game/components/Menu/Menu";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  initialPercent: state.initialPercent,
  xSize: state.xSize,
  ySize: state.ySize,
  isDisabled: state.gameInProgress,
});

export default connect(mapStateToProps)(Menu);
