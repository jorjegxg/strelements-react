import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  authToken: string | null;
  children: React.ReactNode;
};

const ProtectedRoute = ({ authToken, children }: ProtectedRouteProps) => {
  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
