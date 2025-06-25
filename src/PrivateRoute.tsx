import { useEffect } from "react";
import { refreshAccessToken } from "./shared/utils/autoRefresh";
import { CONFIG } from "./shared/utils/constants";
import Logger from "./shared/utils/Logger";

type ProtectedRouteProps = {
  // authToken: string | null;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth");

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

        // Așteaptă 2 secunde înainte de a continua
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          Logger.log("Is refreshing token");
          await refreshAccessToken();
        } catch {
          Logger.log("No refresh token");

          // Așteaptă puțin și înainte de redirect
          // await new Promise((resolve) => setTimeout(resolve, 2000));

          window.location.href = "/";
        }
      }
    };

    checkAuth();
  }, []);

  return children;
};
export const ProtectedRouteToDashboard = ({
  children,
}: ProtectedRouteProps) => {
  useEffect(() => {
    const checkAuth = async () => {
      const expiresAt = Number(
        localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
      );

      if (expiresAt && Date.now() < expiresAt) {
        window.location.href = "/dashboard";
      }
    };

    checkAuth();
  }, []);

  return children;
};
