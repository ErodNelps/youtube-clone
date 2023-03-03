import React from "react";
import { useStyles } from "./styles";
import {
  Modal,
  Fade,
  Backdrop,
  Typography,
  Divider,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import LockIcon from "@material-ui/icons/Lock";
import LinkIcon from "@material-ui/icons/Link";
import PublicIcon from "@material-ui/icons/Public";

const PlaylistDialog = ({ playlists, open, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant={"h5"}>Save to...</Typography>
          <Divider />
          <List>
            {playlists?.map((item, index) => (
              <ListItem key={index}>
                <Checkbox />
                <ListItemText primary={item?.snippet?.title}></ListItemText>
                <ListItemIcon>
                  {item?.status?.privacyStatus === "private" ? (
                    <LockIcon style={{ width: 15, height: 15 }} />
                  ) : (
                    <>
                      {status === "unlisted" ? (
                        <LinkIcon style={{ width: 15, height: 15 }} />
                      ) : (
                        <PublicIcon style={{ width: 15, height: 15 }} />
                      )}
                    </>
                  )}
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
      </Fade>
    </Modal>
  );
};

export default PlaylistDialog;
