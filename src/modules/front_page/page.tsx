// import { colors } from "../../shared/utils/colors";

import Layout from "../layout/Layout";
import { HowItWorks } from "./components/HowItWorksSection";
import { PhoneSection } from "./components/PhoneSection";
import { PictureSection } from "./components/PictureSection";

const FrontPage = () => {
  return (
    <>
      <Layout>
        <PictureSection />
        <HowItWorks />
        <PhoneSection />
      </Layout>
    </>
  );
};

export default FrontPage;
