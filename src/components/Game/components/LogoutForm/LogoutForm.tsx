import React, { FC } from "react";

export interface LogoutFormProps {
  username: string;
  onLogout: (ev: React.FormEvent) => void;
}

export const LogoutForm: FC<LogoutFormProps> = (props) => {
  return (
    <form onSubmit={(ev) => props.onLogout(ev)}>
      <label>Hello, {props.username}!</label>
      <button className="logout_button">logout</button>
    </form>
  );
};
