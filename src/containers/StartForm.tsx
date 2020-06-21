import { connect } from "react-redux";
import { StartForm } from "@/components/Game/components/StartForm/StartForm";
import { AppDispatch } from "@/redux/store";
import { State } from "@/redux/reducers";
import { setUsername } from "@/redux/actions";

const mapStateToProps = (state: State) => ({
  gameInProgress: state.gameInProgress,
  updateSpeed: state.updateSpeed,
});

export default connect(mapStateToProps)(StartForm);
