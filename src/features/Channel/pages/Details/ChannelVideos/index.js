import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { videoAPI } from "api";

import searchAPI from "api/searchAPI";

import VideoItem, { SkeletonVideoItem } from "components/VideoItem";
import KINDS from "constants/itemKindYT";

export default function ChannelVideo(props) {
  const { channelId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState();

  useEffect(() => {
    const getVideos = async (channelId) => {
      try {
        setIsLoading(true);
        const response = await searchAPI.getChannelVideos(channelId, "date");
        const collectVideoIDs = response.items.map((video) => video.id.videoId);
        const videoIDsStringified = collectVideoIDs.join(",");
        const videosResponse = await videoAPI.getListByVideoIDs(
          videoIDsStringified
        );

        setVideos(videosResponse.items);
        console.log(
          ">>>>>>>>>>>>>>>>>>>> videosResponse.items: ",
          videosResponse.items
        );
        setIsLoading(false);
      } catch (error) {
        console.log("Error in getVideos:", error);
        setIsLoading(false);
      }
    };

    getVideos(channelId);
  }, []);

  return (
    <div>
      <Grid container>
        {videos?.map((video) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            key={video.id}
            style={{ padding: "0.5vw" }}
          >
            <VideoItem
              kind={KINDS.Video}
              id={video.id}
              snippet={video.snippet}
              statistics={video.statistics}
              isChannelItem={true}
              contentDetails={video?.contentDetails}
            />
          </Grid>
        ))}

        {isLoading &&
          Array.from(new Array(24)).map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
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
