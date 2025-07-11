import { useRive } from "@rive-app/react-canvas";

export const FrontPageVideo = () => {
  const { RiveComponent } = useRive({
    src: "rive/v3-rive-fp.riv", // Replace with your .riv file
    autoplay: true,
  });

  return (
    <div className="absolute top-0 left-0 w-screen h-full object-cover object-bottom z-0">
      <RiveComponent />
    </div>
  );
};
