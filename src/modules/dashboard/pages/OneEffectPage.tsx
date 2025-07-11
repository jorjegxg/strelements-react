import Layout from "@/modules/layout/Layout";
import CopyableInput from "@/shared/components/CopyableInput";
import GhostButton2 from "@/shared/components/GhostButton2";
import { MySpinner } from "@/shared/components/Spinner";
import { CONFIG } from "@/shared/utils/constants";
import { useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEffectStore } from "./effects/effectsStore";

export default function OneEffectPage() {
  const params = useParams();
  const fetchEffect = useEffectStore((state) => state.fetchEffect);
  const title = useEffectStore((state) => state.title);
  const description = useEffectStore((state) => state.description);
  const videoUrl = useEffectStore((state) => state.videoUrl);
  const loading = useEffectStore((state) => state.loading);

  //url params:
  console.log(params.name);

  //TODO: fa aici
  let kickUserId = Number(localStorage.getItem(CONFIG.localStorage.kickUserId));
  console.log(kickUserId);

  useEffect(() => {
    fetchEffect(params.name!).then(() => {
      console.log("fetched effect");
    });
  }, []);

  return (
    <Layout>
      <div className="min-h- bg-bg ">
        {loading ? (
          <div className="ring-2 ring-amber-50 h-screen w-screen flex justify-center items-center">
            <MySpinner />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8 ">
            {/* Title Section */}
            <div className="text-center mb-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                <span className="pl-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {title}
                </span>
              </h1>
            </div>
            <div className="pt-4"></div>
            <div>
              <p>Copy this link into obs as browser source</p>
              {
                <CopyableInput
                  text={`${CONFIG.FRONTEND_URL}/${params.name}/${kickUserId}`}
                />
              }

              <div className="flex justify-center space-x-4">
                <GhostButton2
                  text={"Test effect"}
                  onClick={() => {
                    window.location.href = `/${params.name}/${kickUserId}/isPreview`;
                  }}
                />
                <GhostButton2
                  text={"Settings"}
                  onClick={() => {
                    window.location.href = "/tiny-walkers/settings";
                  }}
                />
              </div>
            </div>
            {/* Rive Animation Section */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Placeholder for Rive Animation */}
                <div className="w-screen h-[500px] ">
                  {videoUrl && <MyRiveComponent videoUrl={videoUrl} />}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10"></div>
              </div>
            </div>

            {/* Description Section */}
            <div className="max-w-4xl mx-auto text-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                  {title}
                </h2>

                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

type MyRiveComponentProps = {
  videoUrl: string;
};

const MyRiveComponent: React.FC<MyRiveComponentProps> = ({ videoUrl }) => {
  const { RiveComponent } = useRive({
    src: `${videoUrl}`,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return <RiveComponent />;
};
