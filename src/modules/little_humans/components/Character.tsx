import {
  cutString,
  getRandomColor,
  removeKickEmotes,
} from "../../../shared/utils/other";
import { useCharacterStore } from "../characterStore";
const Character = (
  char: {
    id: number;
    name: string;
    zIndex: number;
    x: number;
    message: string;
    emoji: string;
  }
  // messageBackgroundColor: string,
  // messageColor: string,
  // messageSize: number,
  // size: number,
  // nameBackgroundColor: string,
  // nameSize: number
) => {
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
    <div
      key={char.id}
      className=" bottom-0 transition-all duration-500 ease-in-out flex flex-col items-center"
      style={{
        right: `${char.x}px`,
        zIndex: char.zIndex,
      }}
    >
      {/* Mesajul caracterului */}
      {char.message !== "" ? (
        <div
          className="bg-transparent text-sm px-3 py-1 mt-1 rounded-lg shadow-md border max-w-[150px] text-center"
          style={{
            background: messageBackgroundColor,
            color: messageColor,
            fontSize: 15 * messageSize,
          }}
        >
          {cutString(removeKickEmotes(char.message))}
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="animate-bounce" style={{ fontSize: 50 * size }}>
          {char.emoji}
        </div>
      </div>
      {/* Emoji + Numele personajului */}

      <div
        className={`textarea-sm bg-transparent font-semibold  px-3 py-1 rounded-lg  ${getRandomColor(
          char.name
        )}`}
        //TODO: aici
        style={{ background: nameBackgroundColor, fontSize: 15 * nameSize }}
      >
        {cutString(char.name, 20)}
      </div>
    </div>
  );
};

export default Character;
