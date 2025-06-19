// import { colors } from "../../shared/utils/colors";

import { useAppAuthStore } from "@/modules/auth/appAuthStore";

const Deprecated_FrontPage = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  return <>mama</>;
};

export default Deprecated_FrontPage;
