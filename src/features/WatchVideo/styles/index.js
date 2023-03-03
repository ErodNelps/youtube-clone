import { makeStyles } from "@material-ui/core/styles";
import COLORS from "constants/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "5vw",
      paddingRight: "5vw",
    },
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "2vw",
      paddingRight: "2vw",
    },
    width: "100%",
    height: "100%",
    flexGrow: 1,
    paddingTop: 20,
    justifyItems: "center",
    backgroundColor: "transparent",
    //overflow: "hidden",
    //" &:-webkit-scrollbar": {
    //  display: "none",
    //},
    //msOverflowStyle: "none",
  },
  videoFrame: {
    [theme.breakpoints.up("lg")]: {
      height: "572px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "390px",
    },
  },
  videoStats: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 5,
    color: COLORS.Gray,
    alignItems: "center",
  },
  videoTitle: {
    marginTop: 20,
  },
  videoActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    color: COLORS.Gray,
    marginLeft: 10,
  },
  likeSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "170px",
    marginRight: 10,
  },
  likeButtonsGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "inherit",
    alignItems: "center",
    paddingLeft: 1,
    paddingRight: 1,
  },
  likeButton: {
    alignItems: "center",
    color: COLORS.Gray,
  },
  dislikeBar: {
    color: COLORS.DavyGrey,
  },
  likeRatioBar: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
  },
  isActive: {
    color: COLORS.DodgerBlue,
    backgroundColor: "transparent",
  },
  relatedSection: {},
  playlistContainer: {
    borderRadius: 0,
    border: `1px solid ${COLORS.DarkCharcoal}`,
    marginBottom: "20px",
  },
  playlist: {
    maxHeight: 200,
    overflow: "auto",
    backgroundColor: COLORS.CodGray,
  },
  playlistDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "80px",
    padding: "0px 15px 0px 15px",
    boxSizing: "border-box",
    backgroundColor: COLORS.RaisinBlack,
  },
  playlistStatus: {
    display: "flex",
    flexDirection: "row",
  },
  playlistChannel: {
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 500,
    "&::after": {
      content: "' - '",
    },
    "&::before": {
      content: "' '",
    },
  },
  statusLabel: {
    boxSizing: "border-box",
    paddingLeft: 5,
    paddingRight: 5,
    background: COLORS.MineCraft,
  },
}));
