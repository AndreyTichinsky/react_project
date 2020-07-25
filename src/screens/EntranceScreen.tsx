import React, { useCallback, FC } from "react";
import { useHistory } from "react-router-dom";
import { Entrance } from "@/modules/Entrance";
import { actions } from "@/modules/Entrance/reducer";
import { connect } from "react-redux";
import { State } from "@/redux/store";

const mapStateToProps = (state: State) => ({
  username: state.entrance.username,
});

export const EntranceScreenComponent: FC<{}> = (props: any) => {
  const history = useHistory();
  const lastUser = localStorage.getItem("GameOfLife");
  if (lastUser) {
    const parsedData = JSON.parse(lastUser);
    if (props.username !== parsedData.username) {
      props.dispatch(actions.setUsername(parsedData.username));
    }
  }
  const onSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      const data = { username: props.username };
      const serialData = JSON.stringify(data);
      localStorage.setItem("GameOfLife", serialData);
      history.push(`/users/${props.username}`);
    },
    [props.username]
  );
  return <Entrance submitHandler={onSubmit} />;
};

export const EntranceScreen = connect(mapStateToProps)(EntranceScreenComponent);
