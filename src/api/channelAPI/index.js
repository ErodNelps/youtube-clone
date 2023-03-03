import axiosClient from "api/config";

const channelAPI = {
  getMyChannel: (params) => {
    const url = "/channels?mine=true";
    return axiosClient.get(url, { params: params });
  },
  getChannel: (params) => {
    const url = "/channels";
    return axiosClient.get(url, { params: params });
  },

  getChannelList: ({
    part = "brandingSettings,contentDetails,contentOwnerDetails,id,localizations,snippet,statistics,status,topicDetails", // full info except auditDetails
    forUsername,
    id,
    managedByMe,
    mine,
    hl,
    maxResults,
    onBehalfOfContentOwner,
    pageToken,
  }) => {
    const url = "/channels";

    const params = {
      part,
      forUsername,
      id,
      managedByMe,
      mine,
      hl,
      maxResults,
      onBehalfOfContentOwner,
      pageToken,
    };

    return axiosClient.get(url, { params: params });
  },
};

export default channelAPI;
