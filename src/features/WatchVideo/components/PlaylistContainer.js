import React, { useState } from "react";
import { useStyles } from "features/WatchVideo/styles";
import { Paper, List, IconButton, Collapse } from "@material-ui/core";
import PlaylistItem from "components/VideoItem/PlaylistItem";
import { Typography, Tooltip } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import LockIcon from "@material-ui/icons/Lock";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const PlaylistContainer = ({
  items,
  videoIndex,
  playlistId,
  playlistInfos,
  pageInfos,
  status,
  ...props
}) => {
  const classes = useStyles();
  const [playlistExpanded, setPlaylistExpanded] = useState(true);

  const handleExpandPlaylist = () => {
    setPlaylistExpanded(!playlistExpanded);
  };

  return (
    <Paper className={classes.playlistContainer} elevation={0}>
      <div className={classes.playlistDetails}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant={"h5"}>{playlistInfos?.title}</Typography>
          <div className={classes.playlistStatus}>
            {status === "private" ? (
              <Paper elevation={0} className={classes.statusLabel}>
                <LockIcon style={{ width: 10, height: 10 }} /> Private
              </Paper>
            ) : (
              <>
                {status === "unlisted" ? (
                  <Paper elevation={0} className={classes.statusLabel}>
                    <LinkIcon style={{ width: 10, height: 10 }} /> Unlisted
                  </Paper>
                ) : null}
              </>
            )}
            <Tooltip title={playlistInfos?.channelTitle}>
              <Typography
                variant={"subtitle2"}
                className={classes.playlistChannel}
              >
                {playlistInfos?.channelTitle}
              </Typography>
            </Tooltip>
            {videoIndex}/{pageInfos?.totalResults}
          </div>
        </div>
        <IconButton onClick={handleExpandPlaylist}>
          {playlistExpanded ? (
            <ExpandLessIcon style={{ padding: 0 }} />
          ) : (
            <ExpandMoreIcon style={{ padding: 0 }} />
          )}
        </IconButton>
      </div>
      <Collapse in={playlistExpanded}>
        <List className={classes.playlist}>
          {items?.map((item, index) => {
            return (
              <PlaylistItem
                key={index + 1}
                snippet={item?.snippet}
                index={index + 1}
                active={videoIndex === index + 1 ? true : false}
                playlistId={playlistId}
                status={item?.status}
              />
            );
          })}
        </List>
      </Collapse>
    </Paper>
  );
};

export default PlaylistContainer;
