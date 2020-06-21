import { connect } from "react-redux";
import { Cell } from "@/components/Game/components/Field/components/Cell/Cell";
import { State } from "@/redux/reducers";
import { makeConvertSpeedToNumber, makeGetAlive } from "@/redux/selectors";

const makeMapStateToProps = () => {
  const convertSpeedToNumber = makeConvertSpeedToNumber();
  const getAlive = makeGetAlive();
  const mapStateToProps = (state: State, props: any) => {
    return {
      cellSize: state.cellSize,
      isAlive: getAlive(state, props),
      animationSpeed: convertSpeedToNumber(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Cell);
