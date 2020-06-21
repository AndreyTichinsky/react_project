import { connect } from "react-redux";
import { Field } from "@/components/Game/components/Field/Field";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  field: state.fieldState,
  cellSize: state.cellSize,
});

export default connect(mapStateToProps)(Field);
