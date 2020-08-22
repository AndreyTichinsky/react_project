import React, { FC } from "react";
import { connect } from "react-redux";

import { State } from "@/redux";
import { LogoutFormProps } from "./LogoutForm.interface";

const mapStateToProps = (state: State) => ({
  username: state.entrance.username,
});

const LogoutFormComponent: FC<LogoutFormProps> = (props) => {
  return (
    <form onSubmit={(ev) => props.onLogout(ev)}>
      <label>Hello, {props.username}!</label>
      <button className="logout_button">logout</button>
    </form>
  );
};

export const LogoutForm = connect(mapStateToProps)(LogoutFormComponent);
