import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./features/Home";
import PrimarySearchAppBar from "components/AppBar";
import paths from "configs/paths";
import { ThemeProvider } from "@material-ui/core";
import { appTheme } from "./appTheme";
import Login from "features/Login";
import localStorageKeys from "configs/localStorageKeys";
import { authenAction, checkTokenStatus } from "app/authen/authenSlice";
import Search from "features/Search";
import store from "app/store";
import WatchVideoPage from "features/WatchVideo";
import ChannelIndex from "features/Channel";
import PlaylistPage from "features/Playlist";

function App() {
  const mount = async () => {
    await store.dispatch(
      authenAction.verifyAuthentication({
        authToken: localStorage.getItem(localStorageKeys.TOKEN),
      })
    );
    await store.dispatch(checkTokenStatus());
  };

  useEffect(() => {
    mount();
  }, []);

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Switch>
            <Route exact path={paths.LOGIN}>
              <Login />
            </Route>
            <PrimarySearchAppBar>
              <Switch>
                <Route exact path={paths.BASE}>
                  <HomePage />
                </Route>
                <Route exact path={paths.SEARCH}>
                  <Search />
                </Route>
                <Route path={paths.WATCH}>
                  <WatchVideoPage />
                </Route>

                <Route path={paths.CHANNEL}>
                  <ChannelIndex />
                </Route>

                <Route path={paths.PLAYLIST}>
                  <PlaylistPage />
                </Route>
                <Route>
                  <div>{"404 - Not found - /path-wrong"}</div>
                </Route>
              </Switch>
            </PrimarySearchAppBar>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
