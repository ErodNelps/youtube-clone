import React, { useEffect } from "react";

import { Typography, Button, Grid, Link, Avatar } from "@material-ui/core";

import useStyles from "components/DescriptionVideo/styles";

import classNames from "classnames";
import numeral from "numeral";
import { subscriptionAPI } from "api";
import TEXT from "constants/text";

export default function DescriptionVideo({
  video,
  subscribers,
  avatar,
  channelId,
}) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const subscriberCount = subscribers?.statistics?.subscriberCount;
  const hiddenSubscriberCount = subscribers?.statistics?.hiddenSubscriberCount;
  const [isLoading, setIsLoading] = React.useState();
  const [subscriptionId, setSubscriptionId] = React.useState();

  const handleClick = () => {
    setShow(!show);
  };

  const handleToggleSubscribe = async () => {
    try {
      setIsLoading(true);

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

  useEffect(() => {
    const checkWhetherSubscriptionExists = async () => {
      try {
        const response = await subscriptionAPI.checkWhetherSubscriptionExists(
          channelId
        );
        if (response.items.length > 0) {
          setSubscriptionId(response.items[0].id);
        } else {
          setSubscriptionId(undefined);
        }
      } catch (error) {
        console.log("Error in checkWhetherSubscriptionExists: ", error);
      }
    };

    checkWhetherSubscriptionExists();
  }, [channelId]);

  return (
    <div className={classes.root}>
      <hr />
      <Grid item xs={12} className={classes.infoChannel}>
        <div className={classes.flex}>
          <Link
            color="inherit"
            href={`/channel/${channelId}`}
            className={classNames(classes.miniItem, classes.flex)}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              className={classes.avatarChanel}
              src={avatar?.snippet?.thumbnails?.default?.url}
            />
          </Link>
          <div>
            <Link
              color="inherit"
              href={`/channel/${channelId}`}
              className={classNames(classes.miniItem, classes.flex)}
              style={{ textDecoration: "none" }}
            >
              <Typography>{video?.snippet?.channelTitle}</Typography>
            </Link>
            <Typography>
              {hiddenSubscriberCount === false ? (
                <>
                  <span className={classes.uppercase}>
                    {subscriberCount > 1000
                      ? numeral(subscriberCount).format("0.00a")
                      : subscriberCount}
                  </span>{" "}
                  subscribers{" "}
                </>
              ) : null}
            </Typography>
          </div>
        </div>
        <Button
          onClick={handleToggleSubscribe}
          variant="contained"
          className={classNames({
            [classes.btnSubscribe]: subscriptionId === undefined,
            [classes.btnPrimary]: subscriptionId !== undefined,
            [classes.bgrUnset]: subscriptionId !== undefined,
          })}
        >
          {subscriptionId !== undefined
            ? TEXT.BUTTON.SUBSCRIBED
            : TEXT.BUTTON.SUBSCRIBE}
        </Button>
      </Grid>
      <Grid item xs={11} className={classes.description}>
        {show ? (
          <>
            <Typography component="div">
              {video?.snippet?.description
                ? new String(video?.snippet?.description).toString()
                : null}
            </Typography>
            <Button className={classes.btnShowMore} onClick={handleClick}>
              Show Less
            </Button>
          </>
        ) : (
          <>
            <Typography
              component="div"
              textOverflow="ellipsis"
              className={classes.content}
            >
              {video?.snippet?.description
                ? new String(video?.snippet?.description).toString()
                : null}
            </Typography>
            <Button className={classes.btnShowMore} onClick={handleClick}>
              Show More
            </Button>
          </>
        )}
      </Grid>
      <hr />
    </div>
  );
}
