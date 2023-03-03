import React from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { useStyles } from "./styles";
import classNames from "classnames";

const ItemFilter = ({
  value,
  active,
  disabled,
  hideClearIcon,
  handleAddFilterCriteria,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div>
      <ButtonBase
        onClick={handleAddFilterCriteria(value)}
        disableRipple
        disabled={disabled}
        className={classNames({
          [classes.filterGroup]: true,
          [classes.select]: active,
          [classes.disabledOption]: disabled,
        })}
      >
        <Typography primary>{props.children}</Typography>
        {active && !hideClearIcon && <ClearIcon className={classes.clear} />}
      </ButtonBase>
    </div>
  );
};

export default React.memo(ItemFilter);
