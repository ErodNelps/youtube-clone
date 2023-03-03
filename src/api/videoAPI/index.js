import axiosClient from "api/config";

const videoAPI = {
  getVideos: (params) => {
    const url = "/videos";
    return axiosClient.get(url, { params: params });
  },

  getListByVideoIDs: (IDs) => {
    const url = "/videos";
    const queryParams = {
      part: "id,snippet,statistics,contentDetails",
      id: IDs,
    };

    return axiosClient.get(url, { params: queryParams });
  },
  rate: (params) => {
    const url = "/videos/rate";
    return axiosClient.post(url, null, { params: params });
  },
  getRating: (params) => {
    const url = "/videos/getRating";
    return axiosClient.get(url, { params: params });
  },
};

export default videoAPI;
