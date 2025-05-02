import Layout from "../layout/Layout";

const FrontPage = () => {
  return (
    <Layout>
      <div className="">
        {/* Hero Section with Background Video */}
        <section className="relative h-screen w-screen overflow-hidden">
          {/* <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/videos/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          /> */}
          <div className="absolute bg-black w-screen h-screen"></div>

          <div className="relative z-10 flex items-center justify-between h-full    ">
            <h3 className="font-bold rotate-270 text-white ">SCROLL DOWN</h3>
            <h3 className="font-bold rotate-90 text-white">SCROLL DOWN</h3>
          </div>
        </section>

        {/* Alte secțiuni */}
        <section className="py-20 px-4 bg-white text-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Despre noi</h2>
            <p>Text descriptiv aici...</p>
          </div>
        </section>

        {/* ...alte secțiuni */}
      </div>
      <p>Click the button below to go to the game.</p>
    </Layout>
  );
};

export default FrontPage;
