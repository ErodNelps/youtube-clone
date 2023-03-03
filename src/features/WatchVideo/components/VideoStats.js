import React, { useState, useEffect } from "react";
import { useStyles } from "features/WatchVideo/styles";
import { Button, Typography, Tooltip, Hidden } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReplyIcon from "@material-ui/icons/Reply";
import { getShortNumberString } from "constants/numberFormat";
import PlaylistDialog from "components/PlaylistDialog";
import { videoAPI } from "api";

const VideoStats = ({ videoId, video, playlists, ...props }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  let [likePercent, setLikePercent] = useState("50%");
  let [dislikePercent, setDislikePercent] = useState("50%");
  const [rating, setRating] = useState();

  let likeCount = Number(props.likeCount !== 0 ? props.likeCount : null);
  let dislikeCount = Number(null);
  const viewCount = Number(video?.statistics?.viewCount).toLocaleString();
  const liked = isLiked
    ? Number(video?.statistics?.likeCount) + 1
    : Number(video?.statistics?.likeCount);

  const disliked = isDisliked
    ? Number(video?.statistics?.dislikeCount) + 1
    : Number(video?.statistics?.dislikeCount);

  if (video?.statistics?.likeCount && video?.statistics?.dislikeCount) {
    likePercent = 100 * (liked / (liked + disliked)) + "%";
    dislikePercent = 100 * (disliked / (liked + disliked)) + "%";

    likeCount = getShortNumberString(liked);
    dislikeCount = getShortNumberString(disliked);
  }

  const onLikeVideo = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
    setLikePercent(likePercent);
    setDislikePercent(dislikePercent);
    handleRate("like");
  };

  const onDislikeVideo = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
    setLikePercent(likePercent);
    setDislikePercent(dislikePercent);
    handleRate("dislike");
  };

  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);

  const handleShowPlaylistDialog = () => {
    setShowPlaylistDialog(!showPlaylistDialog);
  };

  const handleRate = async (rating) => {
    try {
      setIsLoading(true);

      if (rating === "like") {
        if (isLiked) {
          const response = await videoAPI.rate({
            id: videoId,
            rating: "none",
          });
          if (response) {
            setIsLiked(false);
          }
        } else {
          const response = await videoAPI.rate({
            id: videoId,
            rating: "like",
          });
          if (response) {
            setIsLiked(true);
          }
        }
      } else if (rating === "dislike") {
        if (isDisliked) {
          const response = await videoAPI.rate({
            id: videoId,
            rating: "none",
          });
          if (response) {
            setIsDisliked(false);
          }
        } else {
          const response = await videoAPI.rate({
            id: videoId,
            rating: "dislike",
          });
          if (response) {
            setIsDisliked(true);
          }
        }
      }
    } catch (error) {
      console.log("Error in handleRate: ", error);
    }
  };

  useEffect(() => {
    const handleGetRating = async () => {
      const queryParams = {
        id: videoId,
      };
      const response = await videoAPI.getRating(queryParams);
      setRating(response.items[0].rating);
      if (response.items[0].rating == "like") {
        setIsLiked(true);
        setIsDisliked(false);
      } else if (response.items[0].rating == "dislike") {
        setIsLiked(false);
        setIsDisliked(true);
      } else {
        setIsLiked(false);
        setIsDisliked(false);
      }
    };

    handleGetRating();
  }, []);

  return (
    <div>
      <PlaylistDialog
        open={showPlaylistDialog}
        handleClose={handleShowPlaylistDialog}
        playlists={playlists}
      />
      <Typography variant={"h3"} className={classes.videoTitle}>
        {video?.snippet?.title || ""}
      </Typography>
      <div className={classes.videoStats}>
        <Typography variant={"body1"}>{viewCount + " views " || ""}</Typography>
        <div className={classes.videoActions}>
          <div className={classes.likeSection}>
            <div className={classes.likeButtonsGroup}>
              <Tooltip
                title={isLiked ? "Unlike" : "I like this"}
                placement={"top"}
              >
                <Button
                  className={
                    isLiked
                      ? classes.isActive + " " + classes.likeButton
                      : classes.likeButton
                  }
                  onClick={onLikeVideo}
                >
                  <ThumbUpIcon style={{ marginRight: 5 }} />
                  {likeCount || ""}
                </Button>
              </Tooltip>
              <Tooltip title={"I dislike this"} placement={"top"}>
                <Button
                  className={
                    isDisliked
                      ? classes.isActive + " " + classes.likeButton
                      : classes.likeButton
                  }
                  onClick={onDislikeVideo}
                >
                  <ThumbDownIcon style={{ marginRight: 5 }} />
                  {dislikeCount || ""}
                </Button>
              </Tooltip>
            </div>
            <div className={classes.likeRatioBar}>
              <div
                style={{ width: likePercent, borderTop: "solid" }}
                className={isLiked ? classes.isActive : null}
              ></div>
              <div
                style={{
                  width: dislikePercent,
                  borderTop: "solid",
                }}
                className={isDisliked ? classes.isActive : classes.dislikeBar}
              ></div>
            </div>
          </div>
          <Hidden smDown>
            <Button className={classes.actionButton}>
              <ReplyIcon style={{ marginRight: 10 }} /> Share
            </Button>
            <Button
              className={classes.actionButton}
              onClick={handleShowPlaylistDialog}
            >
              <PlaylistAddIcon style={{ marginRight: 10 }} /> Save
            </Button>
          </Hidden>
        </div>
      </div>
    </div>
  );
};

export default VideoStats;
