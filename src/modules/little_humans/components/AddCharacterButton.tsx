import GhostButton from "../../../shared/components/GhostButton";
import { useCharacterStore } from "../characterStore";

const randomNames = [
  "GamerBoy99",
  "PixelQueen",
  "NoobMaster",
  "xXDragonXx",
  "SpeedyCat",
  "LavaHunter",
  "SilentKiller",
  "TwitchLover",
  "CrispyFries",
  "DonutSlayer",
];

const randomMessages = [
  "Hello everyone!",
  "What's going on here?",
  "LOL that was wild!",
  "GG!",
  "Awesome stream!",
  "I'm back!",
  "Give it another try!",
  "Respect!",
  "No way that just happened!",
  "Absolute legend!",
];

export const AddCharacterButton = () => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  const handleMessage = () => {
    const id = Math.floor(Math.random() * 5000) + 1;
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const message =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];

    addOrUpdateCharacter(id, message, name);
  };

  return (
    <div className="p-8">
      <GhostButton text={"Send test user"} onClick={handleMessage} />
    </div>
  );
};
