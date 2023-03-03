import { fade, makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useVideoItemStyles = makeStyles((theme) => ({
  videoItem: {
    textDecoration: "none",
  },

  miniItem: {
    display: "flex",
    flexDirection: "row",
  },

  playlistItem: {
    display: "flex",
    flexDirection: "row",
    padding: "2px 10px 5px 5px",
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
    display: "none",
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
    width: "25%",
    height: "20%",
  },

  miniThumbnail: {
    // width: "45%",
    maxWidth: 168,
  },
  miniThumbnailSearch: {
    width: "100%",
  },
  channelThumbnail: {
    borderRadius: "50%",
    width: "50%",
  },
  searchResultThumbnail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "25%",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    backgroundColor: "blue",
    objectFit: "none",
  },
  timeDisplay: {
    borderRadius: 3,
    backgroundColor: fade(COLORS.SmokyBlack, 0.7),
    position: "absolute",
    right: "2%",
    bottom: "5%",
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  miniTimeDisplay: {
    right: 4,
    bottom: 24,
  },

  details: {
    paddingTop: 12,
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

  miniTitle: {
    fontSize: "1rem",
    fontWeight: "2rem",
    lineHeight: "1.5rem",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },

  title: {
    fontSize: "1.2rem",
    fontWeight: 500,
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },

  channelAvatar: {
    width: "3rem",
    height: "3rem",
    marginRight: "1.5ch",
  },

  noneDecoration: {
    textDecoration: "none",
  },

  channelTitle: {
    display: "-webkit-box",
    overflow: "hidden",
    fontSize: 14,
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
    "&:hover": {
      color: "inherit",
    },
  },
  channel: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    margin: theme.spacing(1.5, 0),
  },
  avatarChanel: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: 50,
    marginRight: theme.spacing(1),
  },
  content: {
    fontSize: 14,
    paddingTop: 4,
  },

  subscribeButton: {
    backgroundColor: fade(COLORS.BostonUniversityRed, 0.8),
    color: COLORS.White,
    "&:hover": {
      backgroundColor: COLORS.BostonUniversityRed,
    },
  },
  unsubscribeButton: {
    backgroundColor: COLORS.DarkCharcoal,
    color: COLORS.Gray,
    "&:hover": {
      backgroundColor: COLORS.DarkCharcoal,
    },
  },
}));

export default useVideoItemStyles;
