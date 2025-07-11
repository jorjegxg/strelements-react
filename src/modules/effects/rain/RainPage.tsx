import { useRive } from "@rive-app/react-canvas";

const RainPage = () => {
  const { RiveComponent } = useRive({
    src: "/rive/rain.riv",
    stateMachines: "State Machine 1", // Numele mașinii de stare
    autoplay: true,
  });

  return (
    <div className="w-screen h-[500px] ">
      <RiveComponent />
    </div>
  );
};

export default RainPage;
