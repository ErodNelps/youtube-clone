import React from "react";
import MiniItem, { SkeletonMiniItem } from "components/VideoItem/MiniItem";
import { Grid } from "@material-ui/core";
import { useStyles } from "features/WatchVideo/styles";

const RelatedSection = ({ isLoading, videos, lastRelatedVideoRef }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.relatedSection} spacing={1}>
      {videos?.map((item, index) => {
        if (index === videos.length - 1) {
          return (
            <Grid
              item
              xs={"12"}
              // key={item.id.videoId.videoId}
              key={item.id}
              ref={lastRelatedVideoRef}
            >
              <MiniItem
                isLoading={true}
                kind={item.kind}
                etag={item.etag}
                // id={item.id.videoId}
                id={item.id}
                snippet={item.snippet}
                contentDetails={item?.contentDetails}
              />
            </Grid>
          );
        } else {
          return (
            <Grid
              item
              xs={"12"}
              // key={item.id.videoId}
              key={item.id}
            >
              <MiniItem
                isLoading={true}
                kind={item.kind}
                etag={item.etag}
                // id={item.id.videoId}
                id={item.id}
                snippet={item.snippet}
                contentDetails={item?.contentDetails}
              />
            </Grid>
          );
        }
      })}

      {isLoading &&
        Array.from(new Array(24)).map((item, index) => (
          <Grid item xs={"12"} key={index}>
            <SkeletonMiniItem key={index} />
          </Grid>
        ))}
    </Grid>
  );
};

export default RelatedSection;
