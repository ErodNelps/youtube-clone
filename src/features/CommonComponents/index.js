import VideoItem from "components/VideoItem";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import PrimarySearchAppBar from "../../components/AppBar";

export default function CommonComponentIndex() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/appbar`}>
        <PrimarySearchAppBar />
      </Route>

      <Route path={`${match.url}/videoItem`}>
        <VideoItem />
      </Route>

      <Route>
        <div>{`404 - Not found - ${match.url}/path-wrong`}</div>
      </Route>
    </Switch>
  );
}
