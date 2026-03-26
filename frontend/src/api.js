import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// ✅ Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL.replace(/\/$/, ""), // clean baseURL
  headers: { "Content-Type": "application/json" },
});

// ✅ Public routes that don't need Authorization
const publicRoutes = [
  "/api/user/register/",
  "/api/token/",
  "/api/token/refresh/",
];

// ✅ Request interceptor: attach token only for non-public routes
api.interceptors.request.use((config) => {
  const isPublic = publicRoutes.some((route) => config.url.includes(route));

  if (!isPublic) {
    const access = localStorage.getItem(ACCESS_TOKEN);
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }

  return config;
});

// ✅ Response interceptor: handle 401 + refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isPublic = publicRoutes.some((route) =>
      originalRequest.url.includes(route)
    );
    if (isPublic) return Promise.reject(error);

    // Only retry once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // 🔹 Use plain axios here (never api.post) to avoid interceptor loops
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccess = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccess);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (err) {
        // Refresh failed → clear storage & redirect
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;