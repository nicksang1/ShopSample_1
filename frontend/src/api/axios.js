import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // api base url
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache", // will request new data every time
  },
});

// Add auto authorization token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
