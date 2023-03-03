import React from "react";

import {
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Link,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import useStyles from "components/Comment/styles";
import classNames from "classnames";
import { commentAPI } from "api";

export default function CommentThread({ props, replies, parentId, avatar }) {
  const classes = useStyles();
  const [reply, setReply] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);
  const [value, setValue] = React.useState();
  const { replyComment, setReplyComment } = React.useState("");

  const handleReplyComment = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handlePostReply = async () => {
    try {
      const response = await commentAPI.replyComment({
        textOriginal: value,
        parentId: parentId,
      });
      console.log("reply Comment response: ", response);

      setReplyComment(response);
    } catch (error) {
      console.log("Error in reply Comment response: ", error);
    }
  };

  const handleReply = () => {
    setReply(!reply);
  };

  const handleLike = () => {
    setLike(!like);
  };

  const handleDislike = () => {
    setDislike(!dislike);
  };

  return replies ? (
    <div className={classNames(classes.flex, classes.reply)}>
      <Link
        color="inherit"
        href={`/channel/${props?.snippet?.authorChannelId?.value}`}
        className={classNames(classes.miniItem, classes.flex)}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          className={classes.avatarChannel}
          src={props?.snippet?.authorProfileImageUrl}
        />
      </Link>
      <div style={{ width: "100%" }}>
        <div className={classes.flex}>
          {" "}
          <Link
            color="inherit"
            href={`/channel/${props?.snippet?.authorChannelId?.value}`}
            className={classNames(classes.miniItem, classes.flex)}
            style={{ textDecoration: "none" }}
          >
            <Typography className={classes.textBold}>
              {props?.snippet?.authorDisplayName}
            </Typography>
          </Link>
        </div>
        <Typography component="p">
          <div
            style={{ marginTop: 0 }}
            dangerouslySetInnerHTML={{
              __html: props?.snippet?.textDisplay,
            }}
          ></div>
        </Typography>
        <div className={classNames(classes.flex, classes.alignItemCenter)}>
          <IconButton onClick={handleLike} className={classes.btnIcon}>
            <ThumbUpIcon
              className={like ? classes.iconClicked : classes.icon}
            />
          </IconButton>
          <Typography>
            {like ? props?.snippet?.likeCount + 1 : props?.snippet?.likeCount}
          </Typography>
          <IconButton onClick={handleDislike} className={classes.btnIcon}>
            <ThumbDownIcon
              className={dislike ? classes.iconClicked : classes.icon}
            />
          </IconButton>
          <Button onClick={handleReply}>Reply</Button>
        </div>
        {reply ? (
          <>
            <div className={classes.flex}>
              <Avatar
                className={classes.avatarChannel}
                src={avatar?.snippet?.thumbnails?.default?.url}
              />
              <TextField
                placeholder="Add a public reply"
                multiline
                fullWidth
                value={value}
                onChange={handleReplyComment}
              />
            </div>
            <div className={classNames(classes.button, classes.btnReply)}>
              <Button onClick={handleReply}>Cancel</Button>
              <Button variant="contained" onClick={handlePostReply}>
                Reply
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <div className={classes.flex}>
      <Link
        color="inherit"
        href={`/channel/${props?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
        className={classNames(classes.miniItem, classes.flex)}
        style={{ textDecoration: "none" }}
      >
        <Avatar
          className={classes.avatarChannel}
          src={props?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
        />
      </Link>
      <div style={{ width: "100%" }}>
        <div className={classes.flex}>
          <Link
            color="inherit"
            href={`/channel/${props?.snippet?.topLevelComment?.snippet?.authorChannelId?.value}`}
            className={classNames(classes.miniItem, classes.flex)}
            style={{ textDecoration: "none" }}
          >
            <Typography className={classes.textBold}>
              {props?.snippet?.topLevelComment?.snippet?.authorDisplayName}
            </Typography>
          </Link>
        </div>
        <Typography component="p">
          <div
            style={{ marginTop: 0 }}
            dangerouslySetInnerHTML={{
              __html: props?.snippet?.topLevelComment?.snippet?.textDisplay,
            }}
          ></div>
        </Typography>
        <div className={classNames(classes.flex, classes.alignItemCenter)}>
          <IconButton onClick={handleLike} className={classes.btnIcon}>
            <ThumbUpIcon
              className={like ? classes.iconClicked : classes.icon}
            />
          </IconButton>
          <Typography>
            {like
              ? props?.snippet?.topLevelComment?.snippet?.likeCount + 1
              : props?.snippet?.topLevelComment?.snippet?.likeCount}
          </Typography>
          <IconButton onClick={handleDislike} className={classes.btnIcon}>
            <ThumbUpIcon
              className={dislike ? classes.iconClicked : classes.icon}
            />
          </IconButton>
          <Button onClick={handleReply}>Reply</Button>
        </div>
        {reply ? (
          <>
            <div className={classes.flex}>
              <Avatar
                className={classes.avatarChannel}
                src={avatar?.snippet?.thumbnails?.default?.url}
              />
              <TextField
                placeholder="Add a public reply"
                multiline
                fullWidth
                value={value}
                onChange={handleReplyComment}
              />
            </div>
            <div className={classNames(classes.button, classes.btnReply)}>
              <Button onClick={handleReply}>Cancel</Button>
              <Button variant="contained" onClick={handlePostReply}>
                Reply
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
