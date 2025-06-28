import Layout from "@/modules/layout/Layout";
import CopyableInput from "@/shared/components/CopyableInput";
import GhostButton2 from "@/shared/components/GhostButton2";
import { useRive } from "@rive-app/react-canvas";

export default function OneEffectPage() {
  const { RiveComponent } = useRive({
    src: "/rive/tiny-walkers.riv",
    stateMachines: "State Machine 1", // Numele mașinii de stare
    autoplay: true,
  });

  return (
    <Layout>
      <div className="min-h- bg-bg  ">
        <div className="container mx-auto px-4 py-8 ">
          {/* Title Section */}
          <div className="text-center mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Tiny Walkers
              <span className="pl-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"></span>
            </h1>
          </div>
          <div className="pt-4"></div>
          <div>
            <p>Copy this link into obs</p>
            <CopyableInput
              text={"https://strelements.com/strelements-original/43653464"}
            />
            <div className="flex justify-center space-x-4">
              <GhostButton2
                text={"Test effect"}
                onClick={() => {
                  window.location.href =
                    "/strelements-original/34324325/isPreview";
                }}
              />
              <GhostButton2
                text={"Settings"}
                onClick={() => {
                  window.location.href = "/ef1/settings";
                }}
              />
            </div>
          </div>
          {/* Rive Animation Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Placeholder for Rive Animation */}
              <div className="w-screen h-[500px] ">
                <RiveComponent />
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>

          {/* Description Section */}
          <div className="max-w-4xl mx-auto text-start">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Another kind of stream interaction
              </h2>

              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Tiny Walkers is a real-time stream overlay system where animated
                characters represent viewers' messages during a livestream. Each
                character carries the user's name and message across the screen,
                walking, jumping, or performing unique animations. The system
                adds personality and interactivity to the stream, turning chat
                engagement into a playful and visually dynamic experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
