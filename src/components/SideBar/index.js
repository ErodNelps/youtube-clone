import React from "react";
// import { Scrollbars } from "react-custom-scrollbars";

import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  List,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import { useStyles } from "./styles";

export default function SideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBarTop}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Youtube
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div
          classes={{ paper: classes.drawerHeader }}
          className={classes.drawerHeader}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            className={classes.drawerButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Youtube
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button classname={classes.button}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Khám phá"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="Kênh đăng ký"></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Thư viện"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Video đã xem"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <OndemandVideoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Video của bạn"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WatchLaterIcon />
            </ListItemIcon>
            <ListItemText primary="Xem sau"></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ThumbUpAltIcon />
            </ListItemIcon>
            <ListItemText primary="Video đã thích"></ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content} onClick={handleDrawerClose}></main>
    </div>
  );
}
