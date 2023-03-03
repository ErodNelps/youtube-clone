import React, { memo, useState } from "react";

import { Avatar, Link, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  convertTimeToPeriod,
  getTimeFromDurationString,
  simplifyBigNumber,
} from "utils";
import useVideoItemStyles from "components/VideoItem/styles";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import paths from "configs/paths";
import LiveNowBadge from "components/LiveNowBadge";

export const SkeletonVideoItem = memo(() => {
  const classes = useVideoItemStyles();

  return (
    <div className={classes.videoItem}>
      <Skeleton variant="rect" width="100%" height={120} />

      <div className={classes.details}>
        <Skeleton variant="circle" className={classes.channelAvatar} />

        <div className={classes.rightDetails}>
          <Skeleton width="100%" />
          <Skeleton width="40%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </div>
  );
});

const VideoItem = (props) => {
  const {
    kind,
    etag,
    id,
    snippet /** {
      publishedAt,
      channelId,
      title,
      description,
      thumbnails,
      channelTitle,
      liveBroadcastContent,
      publishTime,
    } */,
    statistics /**
    viewCount,
    likeCount,
    dislikeCount,
    favoriteCount,
    commentCount */,

    //
    contentDetails,
    //
    channelSnippet,

    // custom
    isChannelItem = false, // VideoItem belongs to a specific channel: no need to show channelTitle or channelThumbnails
    ...rest
  } = props;

  const classes = useVideoItemStyles();

  return (
    <Link
      color="inherit"
      href={`/watch?v=${id}`}
      className={classes.videoItem}
      style={{ textDecoration: "none" }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={
            snippet?.thumbnails?.high.url ||
            snippet?.thumbnails?.default.url ||
            snippet?.thumbnails?.medium.url
          }
          className={classes.thumbnail}
        />
        {snippet?.liveBroadcastContent === "none" && (
          <span className={classes.timeDisplay}>
            {getTimeFromDurationString(contentDetails?.duration)}
          </span>
        )}
        {isChannelItem && snippet?.liveBroadcastContent === "live" && (
          <span className={classes.timeDisplay}>
            <LiveNowBadge />
          </span>
        )}
      </div>

      <div className={classes.details}>
        {!isChannelItem && (
          <Avatar
            src={channelSnippet?.thumbnails?.default.url}
            className={classes.channelAvatar}
          />
        )}

        <div className={classes.rightDetails}>
          <Typography gutterBottom className={classes.title}>
            {snippet?.title}
          </Typography>

          {!isChannelItem && (
            <Typography
              component={NavLink}
              to={`${paths.CHANNEL}/${snippet?.channelId}`}
              className={classNames(
                classes.noneDecoration,
                classes.channelTitle
              )}
              color="textSecondary"
            >
              {snippet?.channelTitle}
            </Typography>
          )}

          <Typography color="textSecondary">
            {`${simplifyBigNumber(
              statistics?.viewCount,
              0
            )} views \u2022 ${convertTimeToPeriod(snippet?.publishedAt)}`}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default memo(VideoItem);
