import axiosClient from "api/config";

const url = "/videoCategories";

const videoCatsAPI = {
  getVideoCategories: (params) => {
    return axiosClient.get(url, { params: params });
  },
};

export default videoCatsAPI;
