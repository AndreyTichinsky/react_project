import { connect } from "react-redux";
import { EntranceScreen } from "@/screens/EntranceScreen";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  username: state.username,
});

export default connect(mapStateToProps)(EntranceScreen);
