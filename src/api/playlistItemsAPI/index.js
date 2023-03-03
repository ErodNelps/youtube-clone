import axiosClient from "api/config";

const url = "/playlistItems";

const playlistItemsAPI = {
  getPlaylistItems: (params) => {
    return axiosClient.get(url, { params: params });
  },
};

export default playlistItemsAPI;
