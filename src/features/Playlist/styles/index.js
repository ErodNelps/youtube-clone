import { makeStyles } from "@material-ui/core/styles";
import COLORS from "constants/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      paddingRight: "50%",
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: "5vw",
    },
    width: "100%",
    height: "100%",
    flexGrow: 1,
    paddingTop: 20,
    justifyItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  playlistItem: {
    display: "flex",
    flexDirection: "row",
    " &:hover": {
      backgroundColor: COLORS.DarkCharcoal,
      "& $playlistNumIndex": {
        display: "none",
      },
      "& $dragHandle": {
        display: "block",
      },
    },
  },
  dragHandle: {
    display: "block",
    width: 20,
    height: 20,
  },
  playlistNumIndex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  playlistThumbnail: {
    width: "120px",
  },

  details: {
    paddingLeft: 8,
    width: "100%",
    display: "flex",
  },

  rightDetails: {
    flexGrow: 1,
  },

  playlistTitle: {
    fontSize: "0.8rem",
    fontWeight: "1.5rem",
    lineHeight: "1.5rem",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },

  playlistChannel: {
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: "0.7rem",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
    "&:hover": {
      color: "inherit",
    },
  },
  playlistActive: {
    backgroundColor: COLORS.DarkCharcoal,
  },
  playlistIndex: {
    display: "flex",
    width: "38px",
    alignItems: "center",
    justifyContent: "center",
  },
  playlistDivider: {
    marginLeft: "38px",
    marginTop: "20px",
    marginBottom: "20px",
  },
}));
