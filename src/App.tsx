import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { EntranceScreen } from "@/screens/EntranceScreen";
import { GameScreenValidation } from "@/screens/GameScreenValidation";
import { NotLoggedInScreen } from "@/screens/NotLoggedInScreen";
import { NotMatchScreen } from "@/screens/NotMatchScreen";

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
