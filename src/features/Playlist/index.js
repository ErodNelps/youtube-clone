import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/Main";
// import NotFound from "components/NotFound";

export default function PlaylistPage() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url}>
        <MainPage />
      </Route>

      {/* <Route>
        <NotFound />
      </Route> */}
    </Switch>
  );
}
