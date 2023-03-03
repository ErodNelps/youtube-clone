import { makeStyles } from "@material-ui/core";
import COLORS from "constants/colors";

const useDropdownMenuStyles = makeStyles(() => ({
  dropdown: {
    position: "absolute",
    top: 58,
    width: 300,
    transform: "translateX(-45%)",
    backgroundColor: COLORS.RaisinBlack,
    border: `1px solid ${COLORS.DavyGrey}`,
    borderTopWidth: 0,

    overflow: "hidden",
    transition: "height 0.3s ease",
  },
  menu: {
    width: "100%",
    padding: "0.15rem",
  },
}));

export default useDropdownMenuStyles;
