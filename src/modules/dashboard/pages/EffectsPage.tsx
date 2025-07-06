//TODO: aici trebuie lucrat
export const EffectsPage = () => {
  return (
    <div className="w-full h-full">
      <div className="text-white text-4xl flex justify-center items-center pb-8">
        Effects page
      </div>
      {/* <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-8 justify-items-center align-items-center"> */}
      <div className="grid mic:grid-cols-2 mic2:grid-cols-1 mic3:grid-cols-2 mic4:grid-cols-3 space-y-8 justify-items-center align-items-center">
        {StoreCard({
          title: "Tiny walkers",
          imagePath: "/new/COOL-STREAM.png",
          id: 1,
        })}
      </div>
    </div>
  );

  function StoreCard({
    title,
    imagePath,
    id,
  }: {
    title: string;
    imagePath: string;
    id: number;
  }) {
    return (
      <a href={`/effect/${id}`} className="flex ">
        <div className="hover:scale-110 transition-transform duration-300 ease-in-out w-[350px]">
          <div className=" flex justify-center bg-red-300 rounded-2xl">
            <img className=" h-[200px]" src={imagePath} />
          </div>
          <div className="flex justify-between py-2">
            <h1 className="text-start text-xl ">{title}</h1>
          </div>
        </div>
      </a>
    );
  }
};
