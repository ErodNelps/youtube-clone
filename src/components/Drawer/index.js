import React, { useState, useEffect } from "react";
// import { Scrollbars } from "react-custom-scrollbars";

import {
  CssBaseline,
  Drawer,
  List,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import { useStyles } from "./styles";
import { playlistItemsAPI, subscriptionAPI, channelAPI } from "api";
import { useHistory } from "react-router-dom";
import paths from "configs/paths";

export default function AppDrawer(props) {
  const history = useHistory();
  const classes = useStyles();
  const { open, handleDrawerClose, userPlaylists } = props;
  const [listSubscription, setListSubscription] = useState();
  const [myChannel, setMyChannel] = useState();

  const handleGoToHomePage = () => {
    handleDrawerClose();
  };

  const handlePlaylistClick = async (playlistId) => {
    let params = { part: "snippet", playlistId: playlistId };
    const response = await playlistItemsAPI.getPlaylistItems(params);
    if (response) {
      handleDrawerClose();
      history.push({
        pathname: paths.PLAYLIST,
        //search: `v=${response.items[0].snippet.resourceId.videoId}&list=${playlistId}&index=1`,
        search: `list=${playlistId}`,
      });
    }
  };
  useEffect(() => {
    const getListSubscription = async () => {
      const queryParams = {
        part: "snippet",
        mine: "true",
      };
      const response = await channelAPI.getMyChannel(queryParams);
      setMyChannel(response.items[0]);

      let params = {
        part: "snippet,contentDetails",
        channelId: response.items[0].id,
        maxResults: 50,
      };
      const getSubscriptionResponse = await subscriptionAPI.getListSubscription(
        params
      );
      console.log(
        "getListSubscription response: ",
        getSubscriptionResponse.items
      );
      setListSubscription(getSubscriptionResponse.items);
    };

    getListSubscription();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div
          classes={{ paper: classes.drawerHeader }}
          className={classes.drawerHeader}
        >
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="start"
            className={classes.drawerButton}
            onClick={handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Youtube
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleGoToHomePage}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ"></ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Khám phá"></ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="Kênh đăng ký"></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Thư viện"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Video đã xem"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <OndemandVideoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Video của bạn"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WatchLaterIcon />
            </ListItemIcon>
            <ListItemText primary="Xem sau"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ThumbUpAltIcon />
            </ListItemIcon>
            <ListItemText primary="Video đã thích"></ListItemText>
          </ListItem>
        </List>
        {userPlaylists ? (
          <>
            <Divider />
            <List>
              {userPlaylists?.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handlePlaylistClick(item?.id)}
                >
                  <ListItemIcon>
                    <PlaylistPlayIcon />
                  </ListItemIcon>
                  <ListItemText primary={item?.snippet?.title}></ListItemText>
                </ListItem>
              ))}
            </List>
          </>
        ) : null}
        <Divider />
        <Typography className={classes.title}>SUBSCRIPTIONS</Typography>
        <List>
          {listSubscription?.map((item) => (
            <Link
              color="inherit"
              href={`/channel/${item?.snippet?.resourceId?.channelId}`}
              className={classes.miniItem}
              style={{ textDecoration: "none" }}
              key={item?.id}
            >
              <ListItem button>
                <ListItemIcon>
                  <Avatar
                    className={classes.thumbnail}
                    src={item?.snippet?.thumbnails?.default?.url}
                  />
                </ListItemIcon>
                <ListItemText primary={item?.snippet?.title}></ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
