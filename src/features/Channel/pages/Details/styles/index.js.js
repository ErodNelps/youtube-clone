import { fade, makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useChannelDetailsPageStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: COLORS.SmokyBlack,
  },
  banner: {},
  bannerImage: {},
  main: {},
  maxWidthLgCentered: {
    maxWidth: theme.breakpoints.width("lg"),
    margin: "0 auto",
    paddingLeft: "2vw",
    paddingRight: "2vw",
  },
  actionBar: {
    backgroundColor: COLORS.CodGray,
  },

  joinButton: {
    margin: "0 12px",
    color: "blue",
    borderColor: "blue",
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
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  infoLeft: {
    display: "flex",
    alignItems: "center",
  },
  channelAvatar: {
    marginRight: 8,
    width: 88,
    height: 88,
  },

  tabsContainer: {
    marginTop: 12,
  },
  tabs: {},
  tabPanel: {},
  tabPanelsContainer: {},
}));

export default useChannelDetailsPageStyles;
