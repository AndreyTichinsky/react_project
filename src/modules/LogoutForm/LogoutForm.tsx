import React, { FC } from "react";
import { LogoutFormProps } from "./LogoutForm.interface";
import { connect } from "react-redux";
import { State } from "@/redux/reducers";

const mapStateToProps = (state: State) => ({
  username: state.username,
});

export const LogoutFormComponent: FC<LogoutFormProps> = (props) => {
  return (
    <form onSubmit={(ev) => props.onLogout(ev)}>
      <label>Hello, {props.username}!</label>
      <button className="logout_button">logout</button>
    </form>
  );
};

export const LogoutForm = connect(mapStateToProps)(LogoutFormComponent);
