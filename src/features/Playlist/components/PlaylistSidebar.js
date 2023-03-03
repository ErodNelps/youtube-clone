import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import {
  FormControl,
  Select,
  MenuItem,
  Divider,
  Typography,
  capitalize,
} from "@material-ui/core";
import { selectUserProfile } from "app/user/userSlice";
import { useSelector } from "react-redux";
import LinkIcon from "@material-ui/icons/Link";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import { capitalizeFirstLetter } from "utils";

const drawerWidth = "20rem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    display: "flex",
    gap: "1rem",
    padding: 20,
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  playlistOwner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectForm: {
    maxWidth: "100px",
    height: 40,
  },
  privacyOption: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
}));

const privacyOptions = [
  {
    label: "Public",
    value: "public",
    tip: "Anyone can search for	and view",
    icon: <PublicIcon />,
  },
  {
    label: "Unlisted",
    value: "unlisted",
    tip: "Anyone with the link can view",
    icon: <LinkIcon />,
  },
  {
    label: "Private",
    value: "private",
    tip: "Only you can view",
    icon: <LockIcon />,
  },
];
export default function PlaylistSidebar({
  playlistStatus,
  playlistInfo,
  handleStatusChange,
  ...props
}) {
  const classes = useStyles();
  const userProfile = useSelector(selectUserProfile);
  //  const [option, setOption] = useState(playlistStatus?.privacyStatus);

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <img
          src={
            playlistInfo?.snippet?.thumbnails?.maxRes?.url ||
            playlistInfo?.snippet?.thumbnails?.standard?.url ||
            playlistInfo?.snippet?.thumbnails?.high?.url ||
            playlistInfo?.snippet?.thumbnails?.medium?.url ||
            playlistInfo?.snippet?.thumbnails?.default?.url
          }
          className={classes.playlistThumbnail}
        />
        <Typography style={{ fontSize: "1.5rem" }} variant={"h4"}>
          {playlistInfo?.snippet?.title}
        </Typography>
        <Typography>
          {playlistInfo?.contentDetails?.itemCount}{" "}
          {playlistInfo?.contentDetails?.itemCount > 1 ? "videos" : "video"}
        </Typography>
        {playlistStatus && (
          <FormControl classes={{ root: classes.selectForm }}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={playlistStatus?.privacyStatus}
              displayEmpty
              onChange={(event) => handleStatusChange(event)}
              renderValue={(option) => {
                console.log(option);
                return <div>{capitalize(option)}</div>;
              }}
            >
              {privacyOptions.map((option) => (
                <MenuItem
                  key={option.label}
                  classes={{
                    root: classes.privacyOption,
                    selected:
                      playlistStatus?.privacyStatus === option.value
                        ? true
                        : false,
                  }}
                  value={option.value}
                >
                  {option.icon}
                  <div>
                    <Typography variant={"subtitle1"}>
                      {option.label}
                    </Typography>
                    <Typography variant={"subtitle2"}>{option.tip}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Typography>
          {playlistInfo?.snippet?.description === ""
            ? "No description"
            : playlistInfo?.snippet?.description}
        </Typography>
        <Divider />
        <div className={classes.playlistOwner}>
          <Avatar src={userProfile?.imageUrl} />
          <Typography>{playlistInfo?.snippet?.channelTitle}</Typography>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {playlistInfo?.contentDetails?.itemCount === 0 ? (
          <>There is no items in playlist yet</>
        ) : (
          <>{props.children}</>
        )}
      </main>
    </div>
  );
}
