// import { colors } from "../../shared/utils/colors";
import GhostButton from "../../shared/components/GhostButton";
import { colors2 } from "../../shared/utils/colors";
import Layout from "../layout/Layout";

const FrontPage = () => {
  return (
    <>
      <Layout>
        <div className={`m-0 p-0  `}>
          {/* Hero Section with Background Video */}
          <section
            className="relative h-screen w-screen "
            style={{ background: colors2.background }}
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover object-bottom z-0"
              src="/videos/ceva.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div
              className="absolute w-screen h-screen justify-center items-center "
              style={{ color: colors2.text }}
            >
              Welcome to my stream &lt;3
            </div>

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

          {/* Alte secțiuni */}
          <section
            className="py-20 px-4 h-screen bg-kick "
            style={{ background: colors2.kick }}
          >
            <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 flex">
              <div className="card w-64 bg-base-100 shadow-xl inline-block">
                <figure>
                  <img src="/img1.jpg" alt="Poza 1" />
                </figure>
              </div>
              <div className="card w-64 bg-base-100 shadow-xl inline-block">
                <figure>
                  <img src="/img2.jpg" alt="Poza 2" />
                </figure>
              </div>
              <div className="card w-64 bg-base-100 shadow-xl inline-block">
                <figure>
                  <img src="/img3.jpg" alt="Poza 3" />
                </figure>
              </div>
            </div>

            <GhostButton
              text="Try strelements now"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            />
          </section>
        </div>
      </Layout>
    </>
  );
};

export default FrontPage;
