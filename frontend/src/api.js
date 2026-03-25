import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// ✅ create instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ✅ request interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await api.post("/api/token/refresh/", { refresh });

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