import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

export const SideBarItem = ({ label, icon, autoFocus, onClick }) => {
  return (
    <ListItem button key={label} autoFocus={autoFocus}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} onClick={onClick}></ListItemText>
    </ListItem>
  );
};

// export default SideBarItem;
