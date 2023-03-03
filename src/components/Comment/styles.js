import { makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useStyles = makeStyles((theme) => ({
  commentSection: {
    margin: theme.spacing(3, 0),
    display: "flex",
  },
  header: {
    margin: theme.spacing(3, 0),
  },
  avatarChannel: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: 50,
    marginRight: theme.spacing(2),
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  footer: {
    display: "flex",
    alignItems: "center",
    placeContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(1),
    display: "flex",
    "& $Button": {
      padding: theme.spacing(1, 2),
      marginLeft: theme.spacing(1),
      "&:hover": {
        background: "unset",
      },
    },
  },
  term: {
    fontSize: 12,
  },
  flex: {
    display: "flex",
  },

  time: {
    color: COLORS.X11DarkGray,
    fontSize: 12,
    marginLeft: theme.spacing(1),
  },
  textBold: {
    fontSize: 13,
    fontWeight: "bolder",
  },
  icon: {
    fontSize: 16,
    color: COLORS.Gray,
    "&:hover": {
      color: COLORS.White,
    },
  },
  btnIcon: {
    "&:hover": {
      backgroundColor: "unset !important",
    },
  },
  alignItemCenter: {
    alignItems: "center",
    margin: theme.spacing(1, 0),
  },
  btnReply: {
    justifyContent: "flex-end",
  },
  reply: {
    paddingLeft: "10%",
    "& $avatarChannel": {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  },
  btnShowReplies: {
    display: "flex",
    color: COLORS.BrilliantAzure,
    paddingLeft: theme.spacing(7),
    cursor: "pointer",
    paddingBottom: theme.spacing(1),
  },
  iconClicked: {
    color: COLORS.BrilliantAzure,
    fontSize: 16,
  },
}));

export default useStyles;
