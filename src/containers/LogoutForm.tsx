import { connect } from "react-redux";
import { LogoutForm } from "@/components/Game/components/LogoutForm/LogoutForm";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  username: state.username,
});

export default connect(mapStateToProps)(LogoutForm);
