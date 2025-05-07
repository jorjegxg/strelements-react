import { useCharacterStore } from "../characterStore";
import Character from "./Character";

//nameBackgroundColor
//messageBackgroundColor
//size=1
//textSize=1

export const CharacterList = () => {
  const characters = useCharacterStore((state) => state.characters);

  return <>{characters.map((char) => Character(char))}</>;
};
