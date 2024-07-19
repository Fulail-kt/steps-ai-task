import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ai_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("Authorization header:", config.headers.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;