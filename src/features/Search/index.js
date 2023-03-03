import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import FilterSearch from "components/FilterSearch";
import useStyles from "features/Search/styles";
import searchAPI from "api/searchAPI";
import queryString from "query-string";
import SearchResult from "components/VideoItem/SearchResult";
import { useLocation } from "react-router-dom";

const maxResults = 12;
const part = "snippet";

export default function Search() {
  const classes = useStyles();

  const { search } = useLocation();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState();
  const observer = useRef();
  const [needToLoadMore, setNeedToLoadMore] = useState(false);

  const lastVideoElementRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          console.log("visible");
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
    const getSearchResults = async () => {
      try {
        setIsLoading(true);
        let searchParams = queryString.parse(search);
        console.log(">>> searchParams: ", searchParams);

        if (
          searchParams.videoDuration ||
          searchParams.videoDefinition ||
          searchParams.videoDimension ||
          searchParams.videoCaption
        ) {
          searchParams = { ...searchParams, type: "video" };
        }

        const queryParams = {
          part: part,
          maxResults: maxResults,
          // pageToken: nextPageToken,
          ...searchParams,
        };

        const response = await searchAPI.searchList(queryParams);
        // const response = sampleSearchResponse;

        console.log("search response.items: ", response.items);
        setNextPageToken(response.nextPageToken);
        setNeedToLoadMore(false);
        setSearchResults(response.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    console.log("useEffect - trigged by useLocation().search");
    getSearchResults();
  }, [search]);

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setIsLoading(true);
        let searchParams = queryString.parse(search);
        console.log(">>> searchParams: ", searchParams);

        if (
          searchParams.videoDuration ||
          searchParams.videoDefinition ||
          searchParams.videoDimension ||
          searchParams.videoCaption
        ) {
          searchParams = { ...searchParams, type: "video" };
        }

        const queryParams = {
          part: part,
          maxResults: maxResults,
          pageToken: nextPageToken,
          ...searchParams,
        };

        const response = await searchAPI.searchList(queryParams);
        // const response = sampleSearchResponse;

        console.log("search response.items: ", response.items);
        setNextPageToken(response.nextPageToken);
        setSearchResults((prevSearchResults) => [
          ...prevSearchResults,
          ...response.items,
        ]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    console.log("useEffect - trigged by needToLoadMore");
    if (needToLoadMore) {
      console.log("useEffect - if needToLoadMore === true");

      getSearchResults();
      setNeedToLoadMore(false);
    }
  }, [needToLoadMore]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <FilterSearch />

      <Grid
        container
        className={classes.root}
        style={{
          padding: "2vw",
        }}
      >
        {searchResults?.map((item, itemIdx) => {
          if (itemIdx === searchResults.length - 1) {
            // last item
            return (
              <Grid
                item
                xs={12}
                ref={lastVideoElementRef}
                key={item?.id?.videoId}
                style={{ padding: "0.5vw" }}
              >
                <SearchResult
                  isLoading={true}
                  kind={item?.id?.kind}
                  etag={item?.etag}
                  id={
                    item?.id?.videoId ||
                    item?.id?.channelId ||
                    item?.id?.playlistId
                  }
                  channelId={item?.snippet?.channelId || ""}
                  snippet={item?.snippet}
                />
              </Grid>
            );
          } else {
            return (
              <Grid
                item
                xs={12}
                key={item?.id?.videoId}
                style={{ padding: "0.5vw" }}
              >
                <SearchResult
                  isLoading={true}
                  kind={item?.id?.kind}
                  etag={item?.etag}
                  id={
                    item?.id?.videoId ||
                    item?.id?.channelId ||
                    item?.id?.playlistId
                  }
                  channelId={item?.snippet?.channelId || ""}
                  snippet={item?.snippet}
                />
              </Grid>
            );
          }
        })}
      </Grid>

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 80,
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
}
