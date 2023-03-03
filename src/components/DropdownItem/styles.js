import { makeStyles } from "@material-ui/core";

const useDropdownItemStyles = makeStyles((theme) => ({
  menuItem: {
    width: "100%",
    height: "3rem",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "background 0.5s",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
  },
  iconLeft: {},
  iconRight: {
    marginLeft: "auto",
  },
}));

export default useDropdownItemStyles;
