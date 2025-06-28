//TODO: aici trebuie lucrat
const EffectsPage = () => {
  return (
    <div className="w-full px-32 h-full">
      <div className="text-white text-4xl  ">Effects store</div>
      <div className="grid grid-cols-3 p-4 space-x-8">
        {StoreCard({
          title: "Tiny walkers",
          imagePath: "/new/COOL-STREAM.png",
        })}
        {StoreCard({
          title: "Starting soon boats",
          imagePath: "/boat.jpg",
        })}
      </div>
    </div>
  );

  function StoreCard({
    title,
    imagePath,
  }: {
    title: string;
    imagePath: string;
  }) {
    return (
      <div className="hover:scale-110 transition-transform duration-300 ease-in-out">
        <div className=" flex justify-center bg-red-300 rounded-2xl">
          <img className="h-[200px] " src={imagePath} />
        </div>
        <div className="flex justify-between py-2">
          <h1 className="text-start text-xl ">{title}</h1>
        </div>
      </div>
    );
  }
};

export default EffectsPage;
