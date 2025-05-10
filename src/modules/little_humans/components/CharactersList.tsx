import { cutString, getRandomColor } from "../../../shared/utils/other";
import { useCharacterStore } from "../characterStore";

//nameBackgroundColor
//messageBackgroundColor
//size=1
//textSize=1

export const CharacterList = () => {
  const characters = useCharacterStore((state) => state.characters);
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
            <div
              className="text-sm px-3 py-1 mt-1 rounded-lg shadow-md border max-w-[150px] text-center"
              style={{
                background: messageBackgroundColor,
                color: messageColor,
                fontSize: 15 * messageSize,
              }}
            >
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
