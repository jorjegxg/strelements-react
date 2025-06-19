// import { colors } from "../../shared/utils/colors";

import { useAppAuthStore } from "@/modules/auth/appAuthStore";
import Layout from "../layout/Layout";

const FrontPage = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <Layout>
        <FirstSection />
        <div>mama</div>
      </Layout>
    </>
  );
};

export const FirstSection = () => {
  return (
    <img
      src="POZA-PRINCIPALA.png"
      className="w-full h-screen  object-cover object-center"
    />
  );
};

export default FrontPage;
