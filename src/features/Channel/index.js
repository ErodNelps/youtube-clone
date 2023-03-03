import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChannelPage from "features/Channel/pages/Details";

export default function ChannelIndex() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/:channelId`}>
        <ChannelPage />
      </Route>
    </Switch>
  );
}
