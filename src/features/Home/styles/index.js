import { makeStyles } from "@material-ui/core/styles";
import COLORS from "constants/colors";

export const useStyles = makeStyles((theme) => ({
  catBar: {
    position: "fixed",
    width: "100%",
    zIndex: 20,
    backgroundColor: "rgba(33,33,33, 0.9)",
    padding: 10,
  },
  catChip: {
    backgroundColor: COLORS.MineCraft,
  },
  hozScrollbar: {
    marginLeft: 10,
    gap: 2,
  },
  catChipActive: {
    backgroundColor: COLORS.White,
  },
}));
