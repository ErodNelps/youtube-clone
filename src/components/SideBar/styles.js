import { createStyles, makeStyles } from "@material-ui/core";

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
      paddingRight: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(7),
    },
    contentShift: {
      marginLeft: 0,
    },
    button: {
      paddingLeft: 0,
    },
  })
);

// export default useStyles;
