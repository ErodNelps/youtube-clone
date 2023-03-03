import { fade, makeStyles } from "@material-ui/core/styles";
import COLORS from "../../constants/colors";

const useAppBarStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: COLORS.RaisinBlack,
  },
  offset: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  start: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    margin: theme.spacing(1.5),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    flex: "0 1 728px",
    position: "relative",
  },
  search: {
    position: "relative",
    flexGrow: 1,
  },

  searchButton: {
    height: "37px",
    marginLeft: -1,
    backgroundColor: COLORS.DarkCharcoal,
  },
  searchIcon: {
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
    },
  },
  micIconButton: {
    marginTop: 4,
    marginRight: 8,
    marginLeft: 8,
  },
  inputRoot: {
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    backgroundColor: "#121212",

    "&:hover, &:active, &:focus": {
      borderColor: fade("#fff", 0.5),
    },

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: fade("#fff", 0.3),
  },
  sectionDesktop: {
    display: "flex",
  },

  notiBadge: {
    backgroundColor: COLORS.BostonUniversityRed,
  },
}));

export default useAppBarStyles;
