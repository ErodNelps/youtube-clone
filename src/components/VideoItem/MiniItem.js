/* eslint-disable indent */
import React, { useEffect, useState } from "react";

import { Avatar, Link, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  convertTimeToPeriod,
  simplifyBigNumber,
  getTimeFromDurationString,
} from "utils";
import useVideoItemStyles from "components/VideoItem/styles";
import { NavLink, useHistory } from "react-router-dom";

import classNames from "classnames";
import paths from "configs/paths";
import { videoAPI } from "api";
import LiveNowBadge from "components/LiveNowBadge";

export const SkeletonMiniItem = () => {
  const classes = useVideoItemStyles();

  return (
    <div className={classes.miniItem}>
      <Skeleton variant="rect" width="100%" height={120} />

      <div className={classes.details}>
        <div className={classes.rightDetails}>
          <Skeleton width="100%" />
          <Skeleton width="40%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </div>
  );
};

export default function MiniItem(props) {
  const {
    search,
    //kind,
    //etag,
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
    contentDetails,
  } = props;
  const history = useHistory();
  const classes = useVideoItemStyles();

  const [video, setVideo] = useState();
  const onVideoClick = () => {
    history.push(`${paths.WATCH}?v=${id}`);
  };
  useEffect(() => {
    const fetchStatistics = async () => {
      let params = {};
      let response = {};
      params = { part: "statistics,snippet", id: id };
      params = { part: "statistics,snippet", id: id };
      response = await videoAPI.getVideos(params);
      setVideo(response.items[0]);
    };

    fetchStatistics();
  }, []);

  return (
    <Link
      href={`/watch?v=${id}`}
      color="inherit"
      className={classes.miniItem}
      style={{ textDecoration: "none" }}
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
          className={
            search ? classes.miniThumbnailSearch : classes.miniThumbnail
          }
        />
        {snippet?.liveBroadcastContent === "none" &&
          contentDetails?.duration && (
            <span
              className={classNames(
                classes.timeDisplay,
                classes.miniTimeDisplay
              )}
            >
              {getTimeFromDurationString(contentDetails?.duration)}
            </span>
          )}
      </div>

      {search ? (
        <div className={classes.details}>
          <div className={classes.rightDetails}>
            <Typography
              className={classes.miniTitle}
              variant={"h3"}
              onClick={onVideoClick}
            >
              {snippet?.title || "title"}
            </Typography>

            <Typography color="textSecondary" className={classes.content}>
              {snippet?.liveBroadcastContent === "live" ? (
                <LiveNowBadge />
              ) : (
                <>
                  {`${simplifyBigNumber(
                    video?.statistics?.viewCount,
                    0
                  )} views \u2022
                  ${convertTimeToPeriod(snippet?.publishedAt)}`}
                </>
              )}

              <div className={classes.channel}>
                <Avatar className={classes.avatarChanel} />
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
              </div>
              <Typography
                component="div"
                textOverflow="ellipsis"
                className={classes.content}
              >
                {snippet?.description}
              </Typography>
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.details}>
          <div className={classes.rightDetails}>
            <Typography
              className={classes.miniTitle}
              variant={"h3"}
              onClick={onVideoClick}
            >
              {snippet?.title || "title"}
            </Typography>
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

            <Typography color="textSecondary" className={classes.content}>
              {snippet?.liveBroadcastContent === "live" ? (
                <LiveNowBadge />
              ) : (
                <>
                  {`${simplifyBigNumber(
                    video?.statistics?.viewCount,
                    0
                  )} views \u2022
                  ${convertTimeToPeriod(snippet?.publishedAt)}`}
                </>
              )}
            </Typography>
          </div>
        </div>
      )}
    </Link>
  );
}
