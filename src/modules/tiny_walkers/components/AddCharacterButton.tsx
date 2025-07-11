import GhostButton from "../../../shared/components/GhostButton";
import { useCharacterStore } from "../characterStore";

// stream live names
const randomNames = [
  "GamerBoi99",
  "PixelQueen",
  "NoScopeLegend",
  "ChillVibes42",
  "TTV_FluffyFox",
  "xXShadowXx",
  "LunaByte",
  "AFK_Master",
  "CryptoK1ng",
  "SussySamurai",
];

// stream chat messages
const randomMessages = [
  "Let's goooo!",
  "That was insane 😱",
  "Anyone else saw that clutch?",
  "Bro you cracked 💀",
  "Drop the playlist please 🎶",
  "This stream is 🔥",
  "W streamer fr fr",
  "LOL I can’t stop laughing 😂",
  "Where's the mod?",
  "POV: You're addicted to this stream now",
];

export const AddCharacterButton = () => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  const handleMessage = () => {
    const id = Math.floor(Math.random() * 100) + 1;
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const message =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];

    addOrUpdateCharacter(id, message, name);
  };

  return (
    <div className="p-8">
      <GhostButton text={"Test effect"} onClick={handleMessage} />
    </div>
  );
};
