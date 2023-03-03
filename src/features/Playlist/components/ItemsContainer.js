import { List, Divider } from "@material-ui/core";
import { useStyles } from "features/Playlist/styles";
import React from "react";
import PlaylistItem from "./PlaylistItem";
const ItemsContainer = ({ items, playlistId }) => {
  const classes = useStyles();

  return (
    <>
      <List className={classes.container}>
        {items?.map((item, index) => {
          return (
            <>
              <PlaylistItem
                key={index + 1}
                snippet={item?.snippet}
                index={index + 1}
                playlistId={playlistId}
                status={item?.status}
              />
              <Divider className={classes.playlistDivider} />
            </>
          );
        })}
      </List>
    </>
  );
};

export default ItemsContainer;
