// import { colors } from "../../shared/utils/colors";

import { useAppAuthStore } from "@/modules/auth/appAuthStore";
import Layout from "../layout/Layout";

const FrontPage = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <Layout>
        <FirstSection />
      </Layout>
    </>
  );
};

export const FirstSection = () => {
  return (
    <div className="relative">
      <img
        src="POZA-PRINCIPALA2.png"
        className="w-full h-screen  object-cover object-center "
        alt="main-image"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start   w-2/5 p-8 rounded-xl space-y-0 px-16">
        <p className="text-white text-5xl font-bold  text-start">
          Make Your Stream Unforgettable
        </p>
        <br />
        <p className="text-white font-bold  text-text-secondary text-start">
          Turn your audience into active participants and boost your income with
          personalized, animated effects
        </p>
      </div>
    </div>
  );
};

export default FrontPage;
