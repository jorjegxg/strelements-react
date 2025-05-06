import { colors2 } from "../../../shared/utils/colors";

// components/NewEffectSection.tsx
type Effect = {
  title: string;
  description: string;
  videoUrl: string;
};

const effects: Effect[] = [
  {
    title: "Tiny Walkers",
    description:
      "An interactive overlay where chat messages appear as animated characters walking across the screen, enhancing viewer engagement.",
    videoUrl: "/new/COOL-STREAM.png",
  },

  // Poți adăuga oricâte vrei
];

function NewEffectSection() {
  return (
    <section className="">
      <h2 className="text-3xl font-bold flex items-center justify-center pb-5">
        🎉 New Effects
      </h2>
      <div className="gap-6 flex justify-center items-center">
        {/* md:grid-cols-2 lg:grid-cols-3 */}
        {effects.map((effect, index) => (
          <div
            key={index}
            className="card shadow-xl w-[300px]"
            style={{ background: colors2.background }}
          >
            <figure className="relative">
              <img src={effect.videoUrl} className="w-full" />
              <div className="badge badge-error absolute top-2 right-2">
                NEW
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title">{effect.title}</h3>
              <p className="text-start">{effect.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewEffectSection;
