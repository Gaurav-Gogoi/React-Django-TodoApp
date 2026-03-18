import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// ✅ create instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ✅ request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    const publicRoutes = [
      "/api/token/",
      "/api/user/register/"
    ];

    const isPublic = publicRoutes.some((route) =>
      config.url.includes(route)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ response interceptor (your new logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN);

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
          { refresh }
        );

        localStorage.setItem(ACCESS_TOKEN, res.data.access);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ✅ export
export default api;