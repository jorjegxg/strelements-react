import { useEffect } from "react";
import { refreshAccessToken } from "./shared/utils/autoRefresh";
import { CONFIG } from "./shared/utils/constants";

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
      if (!expiresAt || Date.now() > expiresAt) {
        try {
          await refreshAccessToken();
        } catch {
          window.location.href = "/";
        }
      }
    };
    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
