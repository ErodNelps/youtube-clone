import React, { useEffect, useState } from "react";

import {
  NavLink,
  useParams,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

import {
  Button,
  Avatar,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

import COLORS from "constants/colors";
import TEXT from "constants/text";

import { simplifyBigNumber } from "utils";

import useChannelDetailsPageStyles from "features/Channel/pages/Details/styles/index.js";
import classNames from "classnames";

import { channelAPI, subscriptionAPI } from "api";

import ChannelVideos from "features/Channel/pages/Details/ChannelVideos";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

const tabNames = [
  "featured",
  "videos",
  "playlist",
  "community",
  "channel",
  "about",
];

export default function ChannelPage() {
  const match = useRouteMatch();
  const { channelId } = useParams();

  const classes = useChannelDetailsPageStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [channelResource, setChannelResource] = useState();
  const [tabIndex, setTabIndex] = useState(1);

  const [subscriptionId, setSubscriptionId] = useState();

  const handleChangeTabIndex = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleToggleSubscribe = async () => {
    try {
      setIsLoading(true);

      if (subscriptionId) {
        // unsub
        await subscriptionAPI.delete(subscriptionId);
        setSubscriptionId(undefined);
      } else {
        // sub
        const response = await subscriptionAPI.insert(channelId);
        setSubscriptionId(response.id);
      }
    } catch (error) {
      console.log("Error in handleToggleSubscribe: ", error);
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname !== match.url) {
      const splittedArr = pathname.split(`${match.url}/`);
      const selectedTab = splittedArr[splittedArr.length - 1];

      if (tabNames.includes(selectedTab)) {
        handleChangeTabIndex(null, tabNames.indexOf(selectedTab));
      }
    }
  }, []);

  useEffect(() => {
    const getChannelInfo = async (channelId) => {
      try {
        const response = await channelAPI.getChannelList({ id: channelId });
        console.log("getChannelInfo - response: ", response);

        setChannelResource(response.items[0]);
      } catch (error) {
        console.log("Error in getChannelInfo: ", error);
      }
    };

    getChannelInfo(channelId);
  }, []);

  useEffect(() => {
    const checkWhetherSubscriptionExists = async (forChannelId) => {
      try {
        const response = await subscriptionAPI.checkWhetherSubscriptionExists(
          forChannelId
        );

        if (response.items.length > 0) {
          setSubscriptionId(response.items[0].id);
        } else {
          setSubscriptionId(undefined);
        }
      } catch (error) {
        console.log("Error in checkWhetherSubscriptionExists: ", error);
      }
    };

    checkWhetherSubscriptionExists(channelId);
  }, []);

  return (
    <div className={classes.root}>
      <Box
        className={classes.banner}
        style={{
          backgroundImage: `url(${channelResource?.brandingSettings.image?.bannerExternalUrl})`,
          backgroundSize: "cover",
          height: "300px",
          color: COLORS.DarkCharcoal,
          backgroundPosition: "center",
        }}
      />

      <div className={classes.actionBar}>
        <div className={classNames(classes.info, classes.maxWidthLgCentered)}>
          <div className={classes.infoLeft}>
            <Avatar
              src={
                channelResource?.snippet.thumbnails?.medium.url ||
                channelResource?.snippet.thumbnails?.default.url
              }
              className={classes.channelAvatar}
            />
            <div>
              <Typography variant="h4">
                {channelResource?.snippet.title}
              </Typography>
              {channelResource?.statistics.hiddenSubscriberCount === false && (
                <Typography>
                  {`${simplifyBigNumber(
                    channelResource?.statistics.subscriberCount
                  )} subscribers`}
                </Typography>
              )}
            </div>
          </div>

          <div>
            <Button variant="outlined" className={classes.joinButton}>
              {TEXT.BUTTON.JOIN}
            </Button>
            <Button
              onClick={handleToggleSubscribe}
              variant="contained"
              className={classNames({
                [classes.subscribeButton]: subscriptionId === undefined,
                [classes.unsubscribeButton]: subscriptionId !== undefined,
              })}
            >
              {subscriptionId !== undefined
                ? TEXT.BUTTON.SUBSCRIBED
                : TEXT.BUTTON.SUBSCRIBE}
            </Button>
          </div>
        </div>

        <div
          className={classNames(
            classes.tabsContainer,
            classes.maxWidthLgCentered
          )}
        >
          <Tabs
            value={tabIndex}
            onChange={handleChangeTabIndex}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
            className={classes.tabs}
          >
            <Tab
              component={NavLink}
              to={`${match.url}/featured`}
              label="HOME"
              {...a11yProps(0)}
            />
            <Tab
              component={NavLink}
              to={`${match.url}/videos`}
              label="VIDEOS"
              {...a11yProps(1)}
            />
            <Tab
              component={NavLink}
              to={`${match.url}/playlists`}
              label="PLAYLISTS"
              {...a11yProps(2)}
            />
            <Tab
              component={NavLink}
              to={`${match.url}/community`}
              label="COMMUNITY"
              {...a11yProps(3)}
            />
            <Tab
              component={NavLink}
              to={`${match.url}/channels`}
              label="CHANNELS"
              {...a11yProps(4)}
            />
            <Tab
              component={NavLink}
              to={`${match.url}/about`}
              label="ABOUT"
              {...a11yProps(5)}
            />
            <IconButton>
              <Search />
            </IconButton>
          </Tabs>
        </div>
      </div>

      <Switch>
        <div className={classes.maxWidthLgCentered}>
          {/* <Route exact path={`${match.url}`}>
            <TabPanel value={tabIndex} index={0}>
              HOME TAB (Featured)
            </TabPanel>
          </Route> */}

          <Route path={`${match.url}/featured`}>
            <TabPanel value={tabIndex} index={0}>
              HOME TAB (Featured)
            </TabPanel>
          </Route>

          <Route exact path={`${match.url}`}>
            <TabPanel value={tabIndex} index={1}>
              <ChannelVideos channelId={channelId} />
            </TabPanel>
          </Route>

          <Route path={`${match.url}/videos`}>
            <TabPanel value={tabIndex} index={1}>
              <ChannelVideos channelId={channelId} />
            </TabPanel>
          </Route>

          {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}

          {/* <TabPanel value={tabIndex} index={0}>
            HOME TAB
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            VIDEOS TAB
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            PLAYLIST TAB
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            COMMUNITY TAB
          </TabPanel>
          <TabPanel value={tabIndex} index={4}>
            CHANNELS TAB
          </TabPanel>
          <TabPanel value={tabIndex} index={5}>
            ABOUT TAB
          </TabPanel> */}
        </div>
      </Switch>
    </div>
  );
}
