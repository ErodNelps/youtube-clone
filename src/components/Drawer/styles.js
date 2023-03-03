import { createStyles, makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

export const drawerWidth = 240;

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBarTop: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 2),
      ...theme.mixins.toolbar,
    },
    drawerButton: {
      marginRight: theme.spacing(3),
    },
    thumbnail: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    title: {
      margin: theme.spacing(1, 2),
      color: COLORS.X11DarkGray,
      fontWeight: "bold",
    },
  })
);

// export default useStyles;
