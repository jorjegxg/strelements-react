import { colors2 } from "../../shared/utils/colors";
import Layout from "../layout/Layout";
import { useCharacterStore } from "../little_humans/characterStore";
import CharacterTsx from "../little_humans/components/Character";

const CharacterSettingsPage = () => {
  const setNameBackgroundColor = useCharacterStore(
    (state) => state.setNameBackgroundColor
  );
  const setMessageBackgroundColor = useCharacterStore(
    (state) => state.setMessageBackgroundColor
  );
  const setMessageColor = useCharacterStore((state) => state.setMessageColor);
  const setSize = useCharacterStore((state) => state.setSize);
  const setMessageSize = useCharacterStore((state) => state.setMessageSize);
  const setNameSize = useCharacterStore((state) => state.setNameSize);

  const messageBackgroundColor = useCharacterStore(
    (state) => state.messageBackgroundColor
  );
  const messageColor = useCharacterStore((state) => state.messageColor);
  const nameBackgroundColor = useCharacterStore(
    (state) => state.nameBackgroundColor
  );
  const size = useCharacterStore((state) => state.size);
  const messageSize = useCharacterStore((state) => state.messageSize);
  const nameSize = useCharacterStore((state) => state.nameSize);

  return (
    <Layout>
      <div style={{ background: colors2.background }}>
        <h2 className="text-2xl font-bold  body-normal">
          🎨 Character Settings
        </h2>

        <div className="min-h-screen w-screen p-6 flex flex-col md:flex-row gap-6  items-start body-normal">
          {/* Settings Card */}
          <div className="   p-6 w-full md:w-1/2 space-y-5 ">
            <div className=" ">
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
              <div>
                <label className="block font-medium mb-1">
                  📛 Name Background Color
                </label>
                ;
                <input
                  type="color"
                  className="w-full h-10 rounded"
                  onChange={(e) => setNameBackgroundColor(e.target.value)}
                  defaultValue={nameBackgroundColor}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  💬 Message Background Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 rounded"
                  onChange={(e) => setMessageBackgroundColor(e.target.value)}
                  defaultValue={messageBackgroundColor}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  📝 Message Text Color
                </label>
                <input
                  type="color"
                  className="w-full h-10 rounded"
                  onChange={(e) => setMessageColor(e.target.value)}
                  defaultValue={messageColor}
                />
              </div>

              <div className=" ">
                <label className="block font-medium mb-1">
                  🔠 Overall Size
                </label>

                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={size}
                  className="range range-neutral w-full"
                  onChange={(e) => setSize(Number(e.target.value))}
                  style={{ color: colors2.kick, background: colors2.text }}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  🔤 Message Text Size
                </label>

                <input
                  type="range"
                  min={0.75}
                  max={2}
                  step={0.1}
                  value={messageSize}
                  className="range range-neutral w-full"
                  onChange={(e) => setMessageSize(Number(e.target.value))}
                  style={{ color: colors2.kick, background: colors2.text }}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  👤 Name Text Size
                </label>

                <input
                  type="range"
                  min={0.75}
                  max={2}
                  step={0.1}
                  value={nameSize}
                  className="range range-neutral w-full"
                  onChange={(e) => setNameSize(Number(e.target.value))}
                  style={{ color: colors2.kick, background: colors2.text }}
                  defaultValue={nameSize}
                />
              </div>
            </div>
            <div>
              <h3>(Autosaving)</h3>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full h-[400px] border border-dashed border-gray-300 rounded-xl ">
              {/* Character preview, bottom-centered */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
                {CharacterTsx({
                  id: 1,
                  name: "Streamer123",
                  zIndex: 2,
                  x: 0,
                  message: "Thanks for the sub!",
                  emoji: "🎉",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CharacterSettingsPage;
