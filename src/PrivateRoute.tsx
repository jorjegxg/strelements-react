type ProtectedRouteProps = {
  // authToken: string | null;
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const expiresAt = Number(
  //       localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
  //     );
  //     if (!expiresAt || Date.now() > expiresAt) {
  //       try {
  //         console.log("Refreshing token");
  //         await refreshAccessToken();
  //         console.log("2");
  //       } catch {
  //         console.log("3");
  //         window.location.href = "/";
  //       }
  //     }
  //   };
  //   checkAuth();
  // }, []);

  return children;
};

export default ProtectedRoute;
