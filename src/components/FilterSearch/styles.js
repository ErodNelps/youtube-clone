import { createStyles, fade, makeStyles } from "@material-ui/core";

import COLORS from "constants/colors";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      fontSize: 14,
      "& $hr": {
        backgroundColor: COLORS.DavyGrey,
        height: 1,
        border: 0,
        margin: theme.spacing(1),
      },
    },
    label: {
      marginLeft: theme.spacing(1),
      textTransform: "uppercase",
      fontWeight: 700,
      letterSpacing: 0.0076,
      fontSize: 14,
      alignSelf: "center",
    },
    iconButton: {
      fontSize: 32,
    },
    button: {
      display: "flex",
      color: COLORS.X11DarkGray,
      "&:hover": {
        color: COLORS.White,
      },
    },
    buttonClicked: {
      display: "flex",
      color: COLORS.BrilliantAzure,
      "&:hover": {
        color: COLORS.White,
      },
    },
    filterGroup: {
      color: COLORS.X11DarkGray,
      marginLeft: theme.spacing(1),
      paddingTop: theme.spacing(2),
      cursor: "pointer",
    },
    clear: {
      fontSize: "unset",
      marginLeft: theme.spacing(1),
    },
    filter: {
      paddingRight: theme.spacing(5),
      paddingTop: theme.spacing(1),
    },

    select: {
      paddingTop: theme.spacing(2),
      color: COLORS.White,
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(1),
    },
    disabledOption: {
      color: fade(COLORS.X11DarkGray, 0.6),
    },
  })
);
