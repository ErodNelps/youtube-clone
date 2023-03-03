import React from "react";

import { Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import useStyles from "components/Comment/styles";
import CommentThread from "components/Comment/commentThread";

export default function Replies({ props }) {
  const classes = useStyles();
  const [showReplies, setShowReplies] = React.useState(false);

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  return showReplies ? (
    <>
      <Typography
        className={classes.btnShowReplies}
        onClick={handleShowReplies}
      >
        <ArrowDropUpIcon />
        Hide replies
      </Typography>
      {props?.replies?.comments.map((reply) => (
        <CommentThread replies key={reply?.id} props={reply} />
      ))}
    </>
  ) : (
    <Typography className={classes.btnShowReplies} onClick={handleShowReplies}>
      <ArrowDropDownIcon />
      View replies
    </Typography>
  );
}
