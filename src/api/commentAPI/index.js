import axiosClient from "api/config";

const commentAPI = {
  getCommentsThread: (queryParams) => {
    const url = "/commentThreads";

    return axiosClient.get(url, { params: queryParams });
  },
  insert: ({ videoId, textOriginal, channelId }) => {
    const url = "/commentThreads";
    const queryParams = {
      part: "id,replies,snippet",
    };
    const data = {
      snippet: {
        channelId: channelId,
        videoId: videoId,
        topLevelComment: {
          snippet: {
            textOriginal: textOriginal,
          },
        },
      },
    };

    return axiosClient.post(url, data, { params: queryParams });
  },
  replyComment: ({ textOriginal, parentId }) => {
    const url = "/comments";
    const queryParams = {
      part: "id, snippet",
    };
    const data = {
      snippet: {
        textOriginal: textOriginal,
        parentId: parentId,
      },
    };

    return axiosClient.post(url, data, { params: queryParams });
  },
};

export default commentAPI;
