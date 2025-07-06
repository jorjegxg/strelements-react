// import { colors } from "../../shared/utils/colors";

import { useKickAuthStore } from "@/modules/auth/KickAuthStore";

const Deprecated_FrontPage = () => {
  const isAuthenticated = useKickAuthStore((state) => state.isAuthenticated);
  return <>mama</>;
};

export default Deprecated_FrontPage;
