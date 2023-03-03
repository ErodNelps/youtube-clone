import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Tooltip,
  Button,
  Avatar,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Mic as MicIcon,
  VideoCall as VideoCallIcon,
} from "@material-ui/icons";

import useAppBarStyles from "./styles";
import AppDrawer from "components/Drawer";

import { DropdownMenu, NavItem } from "components";

import TEXT from "constants/text";

import YoutubeLogoDark from "assets/logo/yt_logo_rgb_dark.png";
import { useSelector } from "react-redux";
import { selectUserProfile } from "app/user/userSlice";
import paths from "configs/paths";
import { playlistAPI } from "api";

export default function PrimarySearchAppBar(props) {
  const classes = useAppBarStyles();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  useEffect(() => {
    const getUserPlaylists = async () => {
      let params = { part: "snippet,status", mine: "true" };
      const response = await playlistAPI.getPlaylists(params);
      setUserPlaylists(response.items);
    };

    getUserPlaylists();
  }, []);

  const [userPlaylists, setUserPlaylists] = useState();
  const [searchQuery, setSearchString] = useState("");

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleSubmitSearch = () => {
    console.log(searchQuery);
    history.push({
      pathname: paths.SEARCH,
      search: "?q=" + searchQuery,
    });
  };

  const userProfile = useSelector(selectUserProfile);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.wrapper}>
            <div className={classes.start}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="openDrawer drawer"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>

              <NavLink to={"/"}>
                <img
                  src={YoutubeLogoDark}
                  className={classes.logo}
                  width={100}
                  height={"auto"}
                />
              </NavLink>
            </div>

            <div className={classes.center}>
              <div className={classes.search}>
                <InputBase
                  onSubmit={handleSubmitSearch}
                  placeholder={TEXT.SEARCH_PLACEHOLDER}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(e) => setSearchString(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <Tooltip title={TEXT.TOOLTIP_SEARCH_BUTTON}>
                <Button
                  onClick={handleSubmitSearch}
                  variant="outlined"
                  className={classes.searchButton}
                >
                  <SearchIcon className={classes.searchIcon} />
                </Button>
              </Tooltip>

              <Tooltip title={TEXT.TOOLTIP_SEARCH_MIC}>
                <IconButton size="small" className={classes.micIconButton}>
                  <MicIcon />
                </IconButton>
              </Tooltip>
            </div>

            <div className={classes.sectionDesktop}>
              <NavItem
                tooltip={TEXT.TOOLTIP_CREATE_VIDEO_BUTTON}
                icon={<VideoCallIcon />}
              ></NavItem>

              <NavItem
                tooltip={TEXT.TOOLTIP_NOTIFICATIONS_BUTTON}
                icon={
                  <Badge
                    badgeContent={17}
                    classes={{
                      badge: classes.notiBadge,
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                }
              />

              <NavItem
                icon={
                  <Avatar
                    src={userProfile.imageUrl}
                    style={{ width: 32, height: 32 }}
                  />
                }
              >
                <DropdownMenu />
              </NavItem>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <AppDrawer
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
        userPlaylists={userPlaylists}
      />
      <div className={classes.offset} />
      {props.children}
    </>
  );
}
