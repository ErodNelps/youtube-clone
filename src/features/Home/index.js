import React, { useEffect, useState, useRef, useCallback } from "react";
import { Grid, useMediaQuery, Chip } from "@material-ui/core";
import VideoItem, { SkeletonVideoItem } from "components/VideoItem";
import { channelAPI, searchAPI, videoAPI, videoCatsAPI } from "api";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { useStyles } from "./styles";

const maxResults = 24;
const part = "snippet";
const type = "video";

export default function HomePage() {
  const overXlMatches = useMediaQuery("(min-width:2400px)");
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  // const [searchResults, setSearchResults] = useState(homeData.items);

  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState();
  const observer = useRef();
  const [needToLoadMore, setNeedToLoadMore] = useState(true);
  const [videoCategories, setVideoCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("1");
  const [categoryLists, setCategoryLists] = useState([]);

  useEffect(() => {
    const getVideoCategories = async () => {
      const params = { part: "snippet", regionCode: "VN" };
      const response = await videoCatsAPI.getVideoCategories(params);
      setVideoCategories(response.items);
      setCategoryLists(
        response.items?.map((cat) => {
          console.log(cat.id);
          return (
            <Chip
              key={cat.id}
              label={cat?.snippet?.title}
              variant="outlined"
              className={classes.catChip}
            />
          );
        })
      );
    };

    getVideoCategories();
  }, []);

  useEffect(() => {
    const getRecommendationVideos = async () => {
      try {
        // make search request with simple data (video snippet only)
        // video snippet not contains channel avatar & video viewCount
        const queryParams = {
          part: part,
          type: type,
          maxResults: maxResults,
          pageToken: nextPageToken,
          videoCategoryId: selectedCat,
        };
        const response = await searchAPI.searchList(queryParams);
        const rawItems = response.items; // not contains channel avatar & video statistics
        // prepare viewCount -> have to call videoAPI
        const videoIDs = rawItems.map((item) => item.id.videoId).join(",");
        const videosResponse = await videoAPI.getListByVideoIDs(videoIDs);

        // prepare channel avatar
        const channelIDsSet = new Set(
          rawItems.map((item) => item.snippet.channelId)
        );
        const channelIDs = [...channelIDsSet].join(",");
        const channelListResponse = await channelAPI.getChannelList({
          part: "snippet",
          id: channelIDs,
        });
        const channelList = channelListResponse.items;
        const foundItemsWithChannelSnippet = videosResponse.items.map(
          (item) => {
            const channel = channelList.find(
              (channel) => channel.id === item.snippet.channelId
            );

            return { ...item, channelSnippet: channel.snippet };
          }
        );

        // console.log(
        //   "foundItemsWithChannelSnippet:",
        //   foundItemsWithChannelSnippet
        // );

        setSearchResults(foundItemsWithChannelSnippet);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getRecommendationVideos();
  }, [selectedCat]);

  const onCategorySelected = (key) => {
    setSelectedCat(key);
  };

  const lastVideoElementRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect(); // disconnect the previous last element
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          setNeedToLoadMore(true);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
      console.log(node);
    },
    [isLoading, nextPageToken]
  );

  useEffect(() => {
    const getRecommendationVideos = async () => {
      try {
        setIsLoading(true);

        // make search request with simple data (video snippet only)
        // video snippet not contains channel avatar & video viewCount
        const queryParams = {
          part: part,
          type: type,
          maxResults: maxResults,
          pageToken: nextPageToken,
          videoCategoryId: selectedCat,
        };
        const response = await searchAPI.searchList(queryParams);
        const rawItems = response.items; // not contains channel avatar & video statistics
        setNextPageToken(response.nextPageToken);

        // prepare viewCount -> have to call videoAPI
        const videoIDs = rawItems.map((item) => item.id.videoId).join(",");
        const videosResponse = await videoAPI.getListByVideoIDs(videoIDs);

        // prepare channel avatar
        const channelIDsSet = new Set(
          rawItems.map((item) => item.snippet.channelId)
        );
        const channelIDs = [...channelIDsSet].join(",");
        const channelListResponse = await channelAPI.getChannelList({
          part: "snippet",
          id: channelIDs,
        });
        const channelList = channelListResponse.items;
        const foundItemsWithChannelSnippet = videosResponse.items.map(
          (item) => {
            const channel = channelList.find(
              (channel) => channel.id === item.snippet.channelId
            );

            return { ...item, channelSnippet: channel.snippet };
          }
        );

        // console.log(
        //   "foundItemsWithChannelSnippet:",
        //   foundItemsWithChannelSnippet
        // );

        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          ...foundItemsWithChannelSnippet,
        ]);

        setIsLoading(false);
      } catch (error) {
        console.log("Error in getRecommendationVideos:", error);
        setIsLoading(false);
      }
    };

    if (needToLoadMore) {
      getRecommendationVideos();
      setNeedToLoadMore(false);
    }
  }, [needToLoadMore]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={classes.catBar}>
        {categoryLists && (
          <ScrollMenu
            data={categoryLists}
            arrowLeft={<NavigateBeforeIcon />}
            arrowRight={<NavigateNextIcon />}
            selected={selectedCat}
            onSelect={onCategorySelected}
            wheel={true}
            itemClass={classes.hozScrollbar}
          />
        )}
      </div>
      <Grid
        container
        style={{
          padding: "2vw",
        }}
      >
        {searchResults?.map((item, itemIdx) => {
          if (itemIdx === searchResults.length - 1) {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={!overXlMatches ? 3 : 2}
                ref={lastVideoElementRef}
                key={item?.id?.videoId}
                style={{ padding: "0.5vw" }}
              >
                <VideoItem
                  isLoading={true}
                  kind={item?.kind}
                  etag={item?.etag}
                  id={item?.id}
                  snippet={item?.snippet}
                  channelSnippet={item?.channelSnippet}
                  statistics={item?.statistics}
                  contentDetails={item.contentDetails}
                />
              </Grid>
            );
          } else {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={!overXlMatches ? 3 : 2}
                key={item.id.videoId}
                style={{ padding: "0.5vw" }}
              >
                <VideoItem
                  isLoading={true}
                  kind={item.kind}
                  etag={item.etag}
                  id={item.id}
                  snippet={item.snippet}
                  channelSnippet={item.channelSnippet}
                  statistics={item.statistics}
                  contentDetails={item.contentDetails}
                />
              </Grid>
            );
          }
        })}

        {isLoading &&
          Array.from(new Array(24)).map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={!overXlMatches ? 3 : 2}
              key={index}
              style={{ padding: "0.5vw" }}
            >
              <SkeletonVideoItem />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
