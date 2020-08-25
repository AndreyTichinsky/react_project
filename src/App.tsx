import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  EntranceScreen,
  GameScreenValidation,
  NotLoggedInScreen,
  NotMatchScreen,
} from "@/screens";

export const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={EntranceScreen} />
        <Route path="/users/:username" component={GameScreenValidation} />
        <Route path="/notloggedin/:username" component={NotLoggedInScreen} />
        <Route path="*" component={NotMatchScreen} />
      </Switch>
    </BrowserRouter>
  );
};
