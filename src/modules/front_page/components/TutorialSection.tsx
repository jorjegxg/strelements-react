import { colors2 } from "../../../shared/utils/colors";

const tutorialSteps = [
  {
    title: "Step 1: Click the Login button",
    description: "Open the app and click on the 'Login' button to begin.",
    image: "/tutorial/1-login.png",
  },
  {
    title: "Step 2: Login with your Kick account",
    description:
      "Grant the necessary permissions so the app can read your Kick data.",
    image: "/tutorial/2.kick-allow-access.png",
  },
  {
    title: 'Step 3: Click on "Try Strelements now"',
    description:
      "Start the Strelements setup by clicking the highlighted button.",
    image: "/tutorial/3-TRY-STRELEMENTS-NOW.png",
  },
  {
    title: "Step 4: Enable the toggle switch",
    description: "Make sure the Strelements overlay switch is turned on.",
    image: "/tutorial/4.SWITCH.png",
  },
  {
    title: "Step 5: Copy the overlay link",
    description:
      "Click the 'Copy Link' button to save your stream overlay URL.",
    image: "/tutorial/5.COPY-LINK.png",
  },
  {
    title: "Step 6: Open OBS Studio",
    description: "Launch OBS Studio on your computer.",
    image: "/tutorial/6.add-source-in-obs.png",
  },
  {
    title: "Step 7: Add a new Browser Source",
    description: "In OBS, add a new 'Browser' source from the source list.",
    image: "/tutorial/7.Browser.png",
  },
  {
    title: "Step 8: Paste the URL and adjust settings",
    description:
      "Paste the copied overlay link and set the width to 1920 and height to 1080.",
    image: "/tutorial/8.Browser-settings.png",
  },
  {
    title: "You're done! 🎉",
    description: "Enjoy your new Strelements overlay and have fun streaming!",
    image: "/tutorial/9.enjoy-streaming.png",
  },
];

export default function TutorialSection() {
  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">
          How to use{" "}
          <span style={{ color: colors2.kick }} className="text-4xl font-bold">
            STRELEMENTS
          </span>
        </h2>
        <p className="mt-2 text-gray-500 text-lg">
          Follow these simple steps to get started in just a few minutes.
        </p>
      </div>

      <div className="space-y-14">
        {tutorialSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-8"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full max-w-xs rounded-2xl shadow-lg ring-1 ring-gray-200"
            />
            <div className="flex-1">
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: colors2.kick }}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
