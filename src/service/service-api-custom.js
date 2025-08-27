import axios from "axios";
import { callGetRefreshToken } from "./service-api";
const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function onRejected(error) {
    const originalRequest = error.config;
    if (error.response.status === 403) {
      alert("403");
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // đánh dấu đã retry 1 lần
      try {
        // Gọi API refresh
        const res = await callGetRefreshToken();

        const newToken = res.data.accessToken;

        localStorage.setItem("access_token", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại → logout
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error.response.data);
  }
);
export default instance;
