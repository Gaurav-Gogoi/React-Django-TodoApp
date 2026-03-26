import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // fixed import
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      setIsAuthorized(false);
      return;
    }
    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const refresh = localStorage.getItem(REFRESH_TOKEN);

    if (!token && !refresh) {
      setIsAuthorized(false);
      return;
    }

    if (!token && refresh) {
      await refreshToken();
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) return <div>Loading ..</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;