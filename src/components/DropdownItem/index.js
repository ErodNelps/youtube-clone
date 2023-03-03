import { ButtonBase, IconButton } from "@material-ui/core";
import useDropdownItemStyles from "components/DropdownItem/styles";
import React from "react";

const DropdownItem = (props) => {
  const { leftIcon, rightIcon, goToMenu, setActiveMenu } = props;
  const classes = useDropdownItemStyles();

  const handleClick = () => {
    if (goToMenu) {
      setActiveMenu(goToMenu);
    }
  };

  return (
    <ButtonBase
      // href="#"
      className={classes.menuItem}
      onClick={handleClick}
    >
      <IconButton disabled>{leftIcon}</IconButton>
      {props.children}
      <IconButton disabled className={classes.iconRight}>
        {rightIcon}
      </IconButton>
    </ButtonBase>
  );
};

export default DropdownItem;
