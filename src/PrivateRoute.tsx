import { useEffect } from "react";
import { refreshAccessToken } from "./shared/utils/autoRefresh";
import { CONFIG } from "./shared/utils/constants";
import Logger from "./shared/utils/Logger";

type ProtectedRouteProps = {
  // authToken: string | null;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useEffect(() => {
    const checkAuth = async () => {
      const expiresAt = Number(
        localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
      );

      Logger.log(
        "Date: " +
          new Date(expiresAt).getDay() +
          " / " +
          new Date(expiresAt).getMonth() +
          " / " +
          new Date(expiresAt).getFullYear()
      );

      if (!expiresAt || Date.now() > expiresAt) {
        Logger.log("Token expired");
        try {
          Logger.log("Is refreshing token");
          await refreshAccessToken();
        } catch {
          Logger.log("No refresh token");
          window.location.href = "/";
        }
      }
    };
    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
