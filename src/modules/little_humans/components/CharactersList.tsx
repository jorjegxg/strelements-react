import { cutString, getRandomColor } from "../../../shared/utils/other";
import { useCharacterStore } from "../characterStore";

export const CharacterList = () => {
  const characters = useCharacterStore((state) => state.characters);

  return (
    <>
      {characters.map((char) => (
        <div
          key={char.id}
          className="absolute bottom-0 transition-all duration-500 ease-in-out flex flex-col items-center"
          style={{
            right: `${char.x}px`,
            zIndex: char.zIndex,
          }}
        >
          {/* Mesajul caracterului */}
          {char.message !== "" ? (
            <div className="bg-white text-sm px-3 py-1 mt-1 rounded-lg shadow-md border max-w-[150px] text-center">
              {cutString(char.message).map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div className="text-5xl animate-bounce">{char.emoji}</div>
          {/* Emoji + Numele personajului */}

          <div
            className={`textarea-sm font-semibold  mt-2 ${getRandomColor(
              char.name
            )}`}
          >
            {cutString(char.name, 20)}
          </div>
        </div>
      ))}
    </>
  );
};
