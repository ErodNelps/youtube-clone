import React from "react";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import useVideoItemStyles from "components/VideoItem/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import paths from "configs/paths";
import { useHistory } from "react-router-dom";

const PlaylistItem = ({ index, snippet, status, active, playlistId }) => {
  const classes = useVideoItemStyles();
  const history = useHistory();

  const handleItemClick = () => {
    history.push({
      pathname: paths.WATCH,
      search: `v=${snippet.resourceId.videoId}&list=${playlistId}&index=${index}`,
    });
  };

  return (
    <div
      className={classNames(classes.playlistItem, {
        [classes.playlistActive]: active,
      })}
      onClick={handleItemClick}
    >
      <div className={classes.playlistIndex}>
        {active ? (
          <PlayArrowIcon style={{ width: 20, height: 20 }} />
        ) : (
          <>
            <div className={classes.playlistNumIndex}>{index}</div>
            <DragHandleIcon className={classes.dragHandle} />
          </>
        )}
      </div>
      {}
      <img
        src={
          status?.privacyStatus === "privacyStatusUnspecified"
            ? "https://s.ytimg.com/yts/img/meh_mini-vfl0Ugnu3.png"
            : snippet?.thumbnails?.high?.url ||
              snippet?.thumbnails?.default?.url ||
              snippet?.thumbnails?.medium?.url
        }
        className={classes.playlistThumbnail}
      />
      <div className={classes.details}>
        <div className={classes.rightDetails}>
          <Typography className={classes.playlistTitle} variant={"h3"}>
            {snippet?.title || "title"}
          </Typography>

          <Typography color="textSecondary" className={classes.playlistChannel}>
            {snippet?.videoOwnerChannelTitle}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
