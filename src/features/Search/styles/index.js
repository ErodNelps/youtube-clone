import { makeStyles } from "@material-ui/core/styles";
import COLORS from "constants/colors";

const useSearchPageStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "1280px",
    display: "block",
    boxSizing: "border-box",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(2, 3),
  },
  item: {
    display: "flex",
    "&:hover": {
      "& $icon": {
        visibility: "visible",
      },
    },
  },
  icon: {
    color: COLORS.X11DarkGray,
    visibility: "hidden",
    "&:hover": {
      color: COLORS.White,
    },
  },
}));

export default useSearchPageStyles;
