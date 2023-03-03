import { makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 14,
    "& $hr": {
      backgroundColor: COLORS.DavyGrey,
      height: 1,
      border: 0,
    //  margin: "unset",
    },
  },
  avatarChanel: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: 50,
    marginRight: theme.spacing(2),
  },
  infoChannel: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnSubscribe: {
    background: COLORS.BostonUniversityRed,
    fontWeight: 600,
    fontSize: 14,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 0.5),
    color: COLORS.White,
    "&:hover": {
      background: COLORS.BostonUniversityRed,
    },
  },
  gridBtn: {
    display: "flex",
    placeContent: "flex-end",
  },
  description: {
    marginTop: theme.spacing(2),
  },
  btnShowMore: {
    fontSize: 14,
    color: COLORS.X11DarkGray,
    marginTop: theme.spacing(1),
    padding: "unset",
    paddingBottom: theme.spacing(2),
    "&:hover": {
      background: "unset",
    },
  },
  content: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxHeight: "4.6em",
    lineHeight: "1.5rem",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: theme.spacing(3),
    margin: theme.spacing(1),
  },
  button: {
    background: COLORS.DarkCharcoal,
    color: COLORS.X11DarkGray,
    fontWeight: 600,
    fontSize: 14,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 0.5),
    "&:hover": {
      background: COLORS.DarkCharcoal,
    },
  },
  dialogActions: {
    justifyContent: "center",
    color: COLORS.X11DarkGray,
    "&:hover": {
      background: "unset",
    },
  },
  bgrUnset: {
    color: COLORS.X11DarkGray + "!important",
    background: "#303030",
    "&:hover": {
      background: "#303030",
    },
  },
  btnPrimary: {
    color: COLORS.X11DarkGray + "!important",
  },
  uppercase: {
    textTransform: "uppercase",
  },
}));

export default useStyles;
