import { useAppAuthStore } from "@/modules/auth/appAuthStore";
import { useRive } from "@rive-app/react-canvas";

type FeatureSection = {
  title: string;
  title2: string;
  content: string;
  pathToAnimation: string;
};

type FeatureCardProps = {
  section: FeatureSection;
  reversed: boolean;
};

export function FeatureCard({ section, reversed = false }: FeatureCardProps) {
  const login = useAppAuthStore((state) => state.startLoginWithKick);
  const { RiveComponent } = useRive({
    src: section.pathToAnimation,
    stateMachines: "State Machine 1", // Numele mașinii de stare
    autoplay: true,
  });

  return (
    <div className={`flex ${reversed ? "flex-row-reverse" : ""} `}>
      {/* Card */}
      <div className="h-[400px] w-[400px] m-16  rounded-2xl text-primary">
        <RiveComponent />
      </div>

      <div className="max-w-md text-left flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-2">{section.title2}</h3>
        <p className="text-color-text-secondary mb-4">{section.content}</p>
        <button
          className="btn rounded-full px-8 bg-color-button-donate hover:bg-color-button-donate-hover text-color-button-text focus:outline focus:ring-2 focus:ring-color-progress-bar"
          onClick={() => login()}
        >
          Try Now
        </button>
      </div>
    </div>
  );
}
