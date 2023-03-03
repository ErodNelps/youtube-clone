import axios from "axios";
import localStorageKeys from "configs/localStorageKeys";
import paths from "configs/paths";
import queryString from "query-string";
// const CLIENT_ID =
//   "761091827197-hmu8os44rilhg47emdu3f35q1lptuh4k.apps.googleusercontent.com";
// const DISCOVERY_DOCS = [
//   "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
// ];
// const SCOPES = [
//   "https://www.googleapis.com/auth/youtube",
//   "https://www.googleapis.com/auth/youtube.readonly",
//   "https://www.googleapis.com/auth/youtubepartner",
//   "https://www.googleapis.com/auth/youtube.force-ssl",
// ];

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   body: (data) => data,
  headers: {
    "Content-Type": "application/json",
  },
  body: (data) => data,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token
  const accessToken = localStorage.getItem(localStorageKeys.TOKEN);

  if (!accessToken) {
    if (window.location.pathname !== paths.LOGIN) {
      window.location.href = `${paths.LOGIN}`;
    }
  }
  // console.log('axiosClient.interceptors.request - accessToken: ', accessToken);

  config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    const originalRequest = error.config;
    console.log("originalRequest (error.config): ", originalRequest);

    if (
      error.response.status === 401 ||
      error.response.status === 403
      // && !originalRequest._retry
    ) {
      if (window.location.pathname !== paths.LOGIN) {
        window.location.href = `${paths.LOGIN}`;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
