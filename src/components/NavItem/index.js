import { IconButton, ClickAwayListener, Tooltip } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    // width: 40,
    // height: 40,

    // padding: 5,
    marginLeft: 2,
    marginRight: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // transition: "filter 300ms",

    // "&:hover": {
    //   filter: "brightness(1.2)",
    // },
  },
}));

const NavItem = (props) => {
  const { icon, tooltip, children } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Tooltip title={tooltip || ""}>
        <div className={classes.navItem}>
          <IconButton
            size="small"
            onClick={handleOpen}
            className={classes.iconButton}
          >
            {icon}
          </IconButton>

          {open && children}
        </div>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default React.memo(NavItem);
