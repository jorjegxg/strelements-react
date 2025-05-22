// import { colors } from "../../shared/utils/colors";
import GhostButton from "../../shared/components/GhostButton";
import { colors2 } from "../../shared/utils/colors";
import { useAppAuthStore } from "../auth/appAuthStore";
import Layout from "../layout/Layout";
import { FrontPageVideo } from "./components/FrontPageVideo";
import NewEffectSection from "./components/NewEffect";
import TutorialSection from "./components/TutorialSection";

const FrontPage = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <Layout>
        <div>
          {/* Hero Section with Background Video */}
          <section
            className="relative h-screen w-screen "
            style={{ background: colors2.fp }}
          >
            <FrontPageVideo />

            {/* <div
              className="max-md:hidden absolute w-screen h-screen justify-center items-center "
              style={{ color: colors2.text }}
            >
              Welcome to my stream &lt;3
            </div> */}

            <div className="relative z-10 flex items-center justify-between h-full">
              <h3
                className={`font-bold rotate-270 whitespace-nowrap`}
                style={{ color: colors2.kick }}
              >
                SCROLL DOWN
              </h3>
              <h3
                className={`font-bold rotate-90  whitespace-nowrap`}
                style={{ color: colors2.kick }}
              >
                SCROLL DOWN
              </h3>
            </div>
          </section>

          <section
            className="h-screen w-screen flex items-center justify-center "
            style={{ background: colors2.secondary }}
          >
            <NewEffectSection />

            {/* customise your stream avatar */}
            {/* <div className="p-8"></div>
            <NewEffectSection /> */}
          </section>
          {/* Alte secțiuni */}
          <section className="py-10 px-4 " style={{ background: colors2.fp }}>
            <TutorialSection />

            {isAuthenticated ? (
              <GhostButton
                text="Try strelements now"
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              />
            ) : (
              <></>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default FrontPage;
