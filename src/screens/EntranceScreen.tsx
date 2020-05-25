import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Entrance } from "@/components/Entrance";

export const EntranceScreen: React.FC<{}> = () => {
  const [username, setUsername] = useState("Guest");
  const history = useHistory();
  const onSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      const data = { username };
      const serialData = JSON.stringify(data);
      localStorage.setItem("GameOfLife", serialData);
      history.push(`/users/${username}`);
    },
    [username]
  );
  return (
    <Entrance
      username={username}
      submitHandler={onSubmit}
      handleUsername={setUsername}
    />
  );
};
