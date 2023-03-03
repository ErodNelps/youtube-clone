import React from "react";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import paths from "configs/paths";
import { useHistory } from "react-router-dom";
import { useStyles } from "features/Playlist/styles";

const PlaylistItem = ({ index, snippet, playlistId }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleItemClick = () => {
    history.push({
      pathname: paths.WATCH,
      search: `v=${snippet.resourceId.videoId}&list=${playlistId}&index=${index}`,
    });
  };

  return (
    <div className={classNames(classes.playlistItem)} onClick={handleItemClick}>
      <div className={classes.playlistIndex}>
        <DragHandleIcon className={classes.dragHandle} />
      </div>
      <img
        src={
          snippet?.thumbnails?.high?.url ||
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
