import { MySpinner } from "@/shared/components/Spinner";
import { useEffect } from "react";
import { useEffectStore } from "./effects/effectsStore";

//TODO: aici trebuie lucrat
export const EffectsPage = () => {
  const effects = useEffectStore((state) => state.effects);
  const loading = useEffectStore((state) => state.loading);
  const error = useEffectStore((state) => state.error);
  const fetchEffects = useEffectStore((state) => state.fetchEffects);

  useEffect(() => {
    fetchEffects();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="text-white text-4xl flex justify-center items-center pb-8">
        Effects page
      </div>
      {/* <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 space-y-8 justify-items-center align-items-center"> */}
      {loading ? (
        <div className="flex justify-center">
          <MySpinner />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="grid mic:grid-cols-2 mic2:grid-cols-1 mic3:grid-cols-2 mic4:grid-cols-3 space-y-8 justify-items-center align-items-center">
          {effects.map((effect) =>
            StoreCard({
              title: effect.title,
              imagePath: effect.image_path,
              id: effect.id,
              name: effect.name,
            })
          )}
        </div>
      )}
    </div>
  );

  function StoreCard({
    title,
    imagePath,
    id,
    name,
  }: {
    title: string;
    imagePath: string;
    id: number;
    name: string;
  }) {
    //TODO: pune pozele pe un server
    return (
      <a href={`/effect/${name}`} className="flex " key={id}>
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
