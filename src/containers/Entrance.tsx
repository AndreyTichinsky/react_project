import { connect } from "react-redux";
import { setUsername } from "@/redux/actions";
import { Entrance } from "@/components/Entrance/Entrance";
import { AppDispatch } from "@/redux/store";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  username: state.username,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  handleUsername: (username: string) => dispatch(setUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entrance);
