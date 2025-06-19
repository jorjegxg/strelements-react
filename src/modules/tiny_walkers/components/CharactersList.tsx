import Logger from "../../../shared/utils/Logger";
import { cutString, getRandomColor } from "../../../shared/utils/other";
import { Character } from "../../../shared/utils/schemas";
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

  Logger.log(
    " size " + size + " messageSize " + messageSize + " nameSize " + nameSize
  );
  return <>{characters.map((char) => Ch(char))}</>;

  function Ch(char: Character) {
    return (
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

        <div
          className=" animate-bounce"
          style={{
            fontSize: 45 * size,
          }}
        >
          {char.emoji}
        </div>
        {/* Emoji + Numele personajului */}

        <div
          className={`textarea-sm font-semibold rounded-md px-2 ${getRandomColor(
            char.name
          )}`}
          style={{
            background: nameBackgroundColor,
            fontSize: 15 * nameSize,
          }}
        >
          {cutString(char.name, 20)}
        </div>
      </div>
    );
  }
};

/** {Character({
            id: char.id,
            name: char.name,
            zIndex: char.zIndex,
            x: char.x,
            message: char.message,
            emoji: char.emoji,
          })} */
