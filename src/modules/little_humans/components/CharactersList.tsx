import { cutString } from "../../../shared/utils/other";
import { useCharacterStore } from "../characterStore";
import { AddCharacterButton } from "./AddCharacterButton";

export const CharacterList = () => {
  const characters = useCharacterStore((state) => state.characters);

  return (
    <div className="relative w-screen h-screen bg-transparent  flex-col justify-between ">
      <AddCharacterButton />
      {characters.map((char) => (
        <div
          key={char.id}
          className="absolute bottom-0 transition-all duration-500 ease-in-out flex flex-col items-center"
          style={{
            left: `${char.x}px`,
            zIndex: char.zIndex,
          }}
        >
          {/* Mesajul caracterului */}
          <div className="bg-white text-sm px-3 py-1 mt-1 rounded-xl shadow-md border max-w-[150px] text-center">
            {cutString(char.message)}
          </div>

          <div className="text-5xl animate-bounce">{char.emoji}</div>
          {/* Emoji + Numele personajului */}
          <div className="text-xl font-semibold text-gray-700 mt-2">
            {char.name}
          </div>
        </div>
      ))}
    </div>
  );
};
