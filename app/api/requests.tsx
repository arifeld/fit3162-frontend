import axios, { AxiosInstance } from 'axios';

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)

const axiosClient = axios.create({
  baseURL: ROOT_URL,
  timeout: 1000,
  // can put headers here if needed 
})

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
);

export default axiosClient;




