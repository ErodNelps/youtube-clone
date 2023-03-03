/* eslint-disable indent */
import React, { useState } from "react";

import { Avatar, Typography, Button, Link } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  convertTimeToPeriod,
  getTimeFromDurationString,
  simplifyBigNumber,
} from "utils";
import useVideoItemStyles from "components/VideoItem/styles";
import { NavLink } from "react-router-dom";

import classNames from "classnames";
import KINDS from "constants/itemKindYT";
import { useEffect } from "react";
import { channelAPI, subscriptionAPI, videoAPI } from "api";
import TEXT from "constants/text";
import { memo } from "react";
import LiveNowBadge from "components/LiveNowBadge";

export const SkeletonSearchResult = memo(() => {
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
});

const SearchResult = (props) => {
  const {
    kind,
    id /** {kind, 
      videoId} */,
    channelId,
    snippet /** {
      publishedAt,
      title,
      description,
      thumbnails,
      channelTitle,
      liveBroadcastContent,
      publishTime,
    } */,
  } = props;

  const classes = useVideoItemStyles();

  const [channel, setChannel] = useState();
  const [subscriptionId, setSubscriptionId] = useState();
  const [video, setVideo] = useState();

  useEffect(() => {
    const fetchStatistics = async () => {
      let params = {};
      let response = {};
      params = { part: "statistics,snippet", id: id };
      if (kind === KINDS.Channel) {
        response = await channelAPI.getChannelList(params);
        setChannel(response.items[0]);
      }
      if (kind === KINDS.Video) {
        params = { part: "snippet", id: channelId };
        let channelRes = await channelAPI.getChannel(params);
        params = { part: "statistics,snippet,contentDetails", id: id };
        response = await videoAPI.getVideos(params);
        setVideo(response.items[0]);
        setChannel(channelRes.items[0]);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    const checkWhetherSubscriptionExists = async (forChannelId) => {
      try {
        const response = await subscriptionAPI.checkWhetherSubscriptionExists(
          forChannelId
        );

        if (response.items.length > 0) {
          setSubscriptionId(response.items[0].id);
        }
      } catch (error) {
        console.log("Error in checkWhetherSubscriptionExists: ", error);
      }
    };

    if (kind === "youtube#channel") {
      checkWhetherSubscriptionExists(channelId);
    }
  });

  const handleToggleSubscribe = async () => {
    try {
      if (subscriptionId) {
        // unsub
        await subscriptionAPI.delete(subscriptionId);
        setSubscriptionId(undefined);
      } else {
        // sub
        const response = await subscriptionAPI.insert(channelId);
        setSubscriptionId(response.id);
      }
    } catch (error) {
      console.log("Error in handleToggleSubscribe: ", error);
    }
  };

  return (
    <Link
      color="inherit"
      href={kind === KINDS.Channel ? `/channel/${id}` : `/watch?v=${id}`}
      className={classes.miniItem}
      style={{ textDecoration: "none" }}
    >
      <div className={classes.searchResultThumbnail}>
        <img
          src={
            snippet?.thumbnails?.high.url ||
            snippet?.thumbnails?.default.url ||
            snippet?.thumbnails?.medium.url
          }
          className={
            kind === KINDS.Channel
              ? classes.channelThumbnail
              : classes.miniThumbnailSearch
          }
        />
        {video?.snippet?.liveBroadcastContent === "none" &&
          video?.contentDetails?.duration && (
            <span className={classes.timeDisplay}>
              {getTimeFromDurationString(video?.contentDetails?.duration)}
            </span>
          )}
      </div>

      <div className={classes.details}>
        <div className={classes.rightDetails}>
          <Typography className={classes.miniTitle} variant={"h3"}>
            {snippet?.title || "title"}
          </Typography>

          <Typography color="textSecondary" className={classes.content}>
            {kind === KINDS.Video
              ? simplifyBigNumber(video?.statistics?.viewCount) +
                " views • " +
                convertTimeToPeriod(snippet.publishTime)
              : null}
            <div className={classes.channel}>
              {!(kind === KINDS.Channel) ? (
                <Avatar
                  className={classes.avatarChanel}
                  src={
                    channel?.snippet?.thumbnails?.high.url ||
                    channel?.snippet?.thumbnails?.default.url ||
                    channel?.snippet?.thumbnails?.medium.url
                  }
                />
              ) : null}
              <Typography
                component={NavLink}
                to={`/channel/${snippet?.channelId}`}
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
          {!(kind === KINDS.Channel) &&
            snippet?.liveBroadcastContent === "live" && (
              <div style={{ marginTop: 8 }}>
                <LiveNowBadge />
              </div>
            )}
        </div>
        {kind === "youtube#channel" && (
          <Button
            onClick={handleToggleSubscribe}
            variant="contained"
            style={{ alignSelf: "center" }}
            className={classNames({
              [classes.subscribeButton]: subscriptionId === undefined,
              [classes.unsubscribeButton]: subscriptionId !== undefined,
            })}
          >
            {subscriptionId !== undefined
              ? TEXT.BUTTON.SUBSCRIBED
              : TEXT.BUTTON.SUBSCRIBE}
          </Button>
        )}
      </div>
    </Link>
  );
};

export default memo(SearchResult);
