const { default: axiosClient } = require("api/config");

const url = "/subscriptions";

const subscriptionAPI = {
  insert: (channelId) => {
    const queryParams = {
      part: "snippet",
    };

    const data = {
      snippet: {
        resourceId: {
          channelId: channelId,
        },
      },
    };

    return axiosClient.post(url, data, { params: queryParams });
  },

  delete: (subscriptionId) => {
    const queryParams = {
      id: subscriptionId,
    };

    return axiosClient.delete(url, { params: queryParams });
  },

  checkWhetherSubscriptionExists: (forChannelId) => {
    const queryParams = {
      part: "snippet,contentDetails",
      forChannelId: forChannelId,
      mine: true,
    };

    return axiosClient.get(url, { params: queryParams });
  },

  getListSubscription: (params) => {
    return axiosClient.get(url, { params: params });
  },
};

export default subscriptionAPI;
