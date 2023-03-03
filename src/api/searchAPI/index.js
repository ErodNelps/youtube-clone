import axiosClient from "api/config";

const url = "/search";

const searchAPI = {
  searchList: (queryParams) => {
    return axiosClient.get(url, { params: queryParams });
  },

  getChannelVideos: (channelId, order = "date", maxResults = 24) => {
    const queryParams = {
      part: "snippet",
      channelId: channelId,
      order: order,
      type: "video",
      maxResults: maxResults,
    };

    return axiosClient.get(url, { params: queryParams });
  },
};

export default searchAPI;
