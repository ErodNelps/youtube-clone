import React from "react";
import numeral from "numeral";

import {
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "components/Comment/styles";
import CommentThread from "components/Comment/commentThread";
import Replies from "components/Comment/replies";
import { commentAPI } from "api";

export default function Comment({
  videoId,
  video,
  comments,
  channelId,
  isLoading,
  avatar,
  lastCommentThreadElementRef,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [click, setClick] = React.useState(false);
  const { insertComment, setInsertComment } = React.useState("");
  console.log("props comments", comments);

  const handleClick = () => {
    setClick(!click);
  };

  const handleComment = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      const response = await commentAPI.insert({
        videoId,
        textOriginal: value,
        channelId,
      });
      console.log("Post insertComment response: ", response);

      setInsertComment(response);
    } catch (error) {
      console.log("Error in setInsertComment response: ", error);
    }
  };

  return (
    <>
      <Typography className={classes.header}>
        {numeral(video?.statistics?.commentCount).format("0,0")} Comments
      </Typography>
      <div className={classes.commentSection}>
        <Avatar
          className={classes.avatarChannel}
          src={avatar?.snippet?.thumbnails?.default?.url}
        />
        <Grid item xs={12}>
          {click ? (
            <>
              <TextField
                multiline
                fullWidth
                value={value}
                onChange={handleComment}
              />
              <Grid item xs={12} className={classes.footer}>
                <Typography className={classes.term}>
                  By completing this action you are creating a channel and agree
                  to YouTube&apos;s Terms of Service.
                </Typography>
                <div className={classes.button}>
                  <Button onClick={handleClick}>Cancel</Button>
                  <Button variant="contained" onClick={handlePostComment}>
                    Comment
                  </Button>
                </div>
              </Grid>
            </>
          ) : (
            <TextField
              placeholder="Add a public comment..."
              multiline
              fullWidth
              onClick={handleClick}
            />
          )}
        </Grid>
      </div>
      {comments?.map((item, itemIdx) => {
        if (itemIdx === comments.length - 1) {
          console.log(item);
          return (
            <div key={item?.id} ref={lastCommentThreadElementRef}>
              <CommentThread props={item} parentId={item?.id} avatar={avatar} />
              {item?.replies ? <Replies props={item} /> : null}
            </div>
          );
        } else {
          return (
            <div key={item?.id}>
              <CommentThread props={item} parentId={item?.id} avatar={avatar} />
              {item?.replies ? <Replies props={item} /> : null}
            </div>
          );
        }
      })}

      {isLoading && (
        <div
          style={{
            paddingBottom: 48,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </>
  );
}
