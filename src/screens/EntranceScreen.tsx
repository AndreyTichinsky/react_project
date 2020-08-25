import React, { useCallback, FC } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { Entrance, entranceActions } from "@/modules";
import { State, AppDispatch } from "@/redux";

type EntranceProps = {
  username: string;
  dispatch: AppDispatch;
};

const mapStateToProps = (state: State) => ({
  username: state.entrance.username,
});

export const EntranceScreenComponent: FC<EntranceProps> = (props) => {
  const history = useHistory();
  const lastUser = localStorage.getItem("GameOfLife");
  if (lastUser) {
    const parsedData = JSON.parse(lastUser);
    if (props.username !== parsedData.username) {
      props.dispatch(entranceActions.setUsername(parsedData.username));
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
