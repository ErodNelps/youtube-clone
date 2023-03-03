import React, { useCallback, useEffect, useRef, useState } from "react";
import IFrame from "components/IFrame/IFrame";
import { useStyles } from "features/WatchVideo/styles";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import VideoStats from "../components/VideoStats";
import RelatedSection from "../components/RelatedSection";
import PlaylistContainer from "../components/PlaylistContainer";
import searchAPI from "api/searchAPI";
import DescriptionVideo from "components/DescriptionVideo";
import Comment from "components/Comment";
import {
  videoAPI,
  commentAPI,
  playlistItemsAPI,
  playlistAPI,
  channelAPI,
} from "api";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

const maxResults = 24;
const part = "snippet, statistics";
// const type = "video, playlist";
const type = "video";
const order = "relevance";

const MainPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const queryParams = queryString.parse(history.location.search);
  const videoId = queryParams.v;
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState();
  const [playlistInfo, setPlaylistInfo] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [statisticResult, setStatisticResult] = useState();
  const [commentsResult, setCommentResult] = useState([]);
  const [channelResult, setChannelResult] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [myChannel, setMyChannel] = useState();

  const lessThanMdMatches = useMediaQuery("(max-width:968px)");
  const [relatedVideosNextPageToken, setRelatedVideosNextPageToken] =
    useState();
  const [commentThreadsNextPageToken, setCommentThreadsNextPageToken] =
    useState();
  const commentThreadsObserver = useRef();
  const relatedVideoObserver = useRef();
  const [needToLoadMoreCommentThread, setNeedToLoadMoreCommentThread] =
    useState(true);
  const [needToLoadMoreRelatedVideos, setNeedToLoadMoreRelatedVideos] =
    useState(true);

  const lastCommentThreadElementRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (commentThreadsObserver.current) {
        commentThreadsObserver.current.disconnect();
      }

      commentThreadsObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && commentThreadsNextPageToken) {
          console.log("visible the last comment thread");
          setNeedToLoadMoreCommentThread(true);
        }
      });

      if (node) {
        commentThreadsObserver.current.observe(node);
      }

      console.log(node);
    },
    [isLoading, commentThreadsNextPageToken]
  );
  const lastRelatedVideoRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (relatedVideoObserver.current) {
        relatedVideoObserver.current.disconnect();
      }

      relatedVideoObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && relatedVideosNextPageToken) {
          console.log("visible the last related video");
          setNeedToLoadMoreRelatedVideos(true);
        }
      });

      if (node) {
        relatedVideoObserver.current.observe(node);
      }

      console.log(node);
    },
    [isLoading, relatedVideosNextPageToken]
  );

  useEffect(() => {
    const getPlaylistItems = async () => {
      let params = {
        part: "snippet,status",
        playlistId: queryParams.list,
        maxResults: 50,
      };
      const response = await playlistItemsAPI.getPlaylistItems(params);
      setPlaylist(response);
    };

    const getUserPlaylists = async () => {
      let params = { part: "snippet,status", mine: "true" };
      const response = await playlistAPI.getPlaylists(params);
      setUserPlaylists(response.items);
    };

    const getPlaylistInfo = async () => {
      let params = {
        part: "snippet,status",
        id: queryParams.list,
      };
      const response = await playlistAPI.getPlaylists(params);
      setPlaylistInfo(response.items[0]);
    };

    const getStatistics = async () => {
      const queryParams = {
        part: part,
        id: videoId,
      };
      const response = await videoAPI.getVideos(queryParams);
      console.log("response getStatistics: ", response);
      setStatisticResult(response.items[0]);
      const params = {
        part: "snippet, statistics",
        id: response.items[0].snippet.channelId,
      };
      const channelResponse = await channelAPI.getChannel(params);
      setChannelResult(channelResponse.items[0]);
      console.log("channelResponse.items[0]", channelResponse.items[0]);
    };

    const getMyChannel = async () => {
      const queryParams = {
        part: "snippet",
        mine: "true",
      };
      const response = await channelAPI.getMyChannel(queryParams);
      console.log("response: ", response);
      setMyChannel(response.items[0]);
    };

    if (queryParams.list) {
      getPlaylistItems();
      getPlaylistInfo();
      getStatistics();
    }

    getStatistics();
    getMyChannel();
    getUserPlaylists();
  }, [videoId]);

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsLoading(true);
        const queryParams = {
          part: "id, replies, snippet",
          videoId: videoId,
          order: order,
          maxResults: maxResults,
          pageToken: commentThreadsNextPageToken,
        };
        const response = await commentAPI.getCommentsThread(queryParams);
        console.log("response comment: ", response.items);
        setCommentResult((prevCommentResults) => [
          ...prevCommentResults,
          ...response.items,
        ]);
        setCommentThreadsNextPageToken(response.nextPageToken);
        setIsLoading(false);
      } catch (error) {
        console.log("Error in getComments:", error);
        setIsLoading(false);
      }
    };

    if (needToLoadMoreCommentThread) {
      getComments();
      setNeedToLoadMoreCommentThread(false);
    }
  }, [needToLoadMoreCommentThread]);

  useEffect(() => {
    const getRecommendationVideos = async () => {
      try {
        setIsLoading(true);
        const queryParams = {
          part: "snippet",
          type: type,
          maxResults: maxResults,
          pageToken: relatedVideosNextPageToken,
          relatedToVideoId: videoId,
        };
        const response = await searchAPI.searchList(queryParams);
        console.log(">>> response recommendation video: ", response);
        const videoIDs = response.items.map(
          (foundItem) => foundItem.id.videoId
        );
        const foundVideos = await videoAPI.getListByVideoIDs(videoIDs);
        console.log(">> foundVideos after searchAPI run: ", foundVideos);

        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          // ...response.items,
          ...foundVideos.items,
        ]);
        setRelatedVideosNextPageToken(response.nextPageToken);
        setIsLoading(false);
      } catch (err) {
        console.log("Error in getRecommendationVideos: ", err);
        setIsLoading(false);
      }
    };

    if (needToLoadMoreRelatedVideos) {
      getRecommendationVideos();
      setNeedToLoadMoreRelatedVideos(false);
    }
  }, [needToLoadMoreRelatedVideos]);

  return (
    <Grid
      container
      className={classes.root}
      spacing={lessThanMdMatches ? 0 : 4}
    >
      <Grid item xs={12} sm={12} md={9} className={classes.videoFrame}>
        <IFrame embedId={videoId} />
        <VideoStats
          videoId={videoId}
          video={statisticResult}
          playlists={userPlaylists}
        />
        <DescriptionVideo
          video={statisticResult}
          subscribers={channelResult}
          avatar={channelResult}
          channelId={channelResult?.id}
        />
        <Comment
          isLoading={isLoading}
          comments={commentsResult}
          video={statisticResult}
          videoId={statisticResult?.id}
          channelId={statisticResult?.snippet?.channelId}
          lastCommentThreadElementRef={lastCommentThreadElementRef}
          avatar={myChannel}
        />
      </Grid>
      <Hidden smDown>	
        <Grid item xs={12} sm={12} md={3}>
          {queryParams.list ? (
            <PlaylistContainer
              items={playlist?.items}
              pageInfos={playlist?.pageInfo}
              videoIndex={Number.parseInt(queryParams.index)}
              playlistId={queryParams.list}
              playlistInfos={playlistInfo?.snippet}
              status={playlistInfo?.status?.privacyStatus}
            />
          ) : null}
          <RelatedSection
            videos={searchResults}
            lastRelatedVideoRef={lastRelatedVideoRef}
            isLoading={isLoading}
          />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default MainPage;
