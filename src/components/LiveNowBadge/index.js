import React, { memo } from "react";

import { fade, makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useStyles = makeStyles(() => ({
  root: {
    border: `2px solid ${COLORS.BostonUniversityRed}`,
    borderRadius: 4,
    color: COLORS.BostonUniversityRed,
    backgroundColor: fade(COLORS.DarkCharcoal, 0.7),
    padding: 4,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
}));

const LiveNowBadge = () => {
  const classes = useStyles();

  return <span className={classes.root}>LIVE NOW</span>;
};

export default memo(LiveNowBadge);
