import axiosClient from "api/config";

const url = "/playlists";

const playlistAPI = {
  getPlaylists: (params) => {
    return axiosClient.get(url, { params: params });
  },
  updatePlaylist: (params, body) => {
    return axiosClient.put(url, body, { params: params });
  },
};

export default playlistAPI;
