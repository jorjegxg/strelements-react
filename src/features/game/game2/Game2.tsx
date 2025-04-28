import { AddCharacterButton } from "./AddCharacterButton";
import { useCharacterMovement } from "./CharacterMovement";
import { CharacterList } from "./CharactersList";
import { useChatSoket } from "./soket";

export default function Game2() {
  useChatSoket();
  useCharacterMovement();

  return (
    <div>
      <AddCharacterButton />
      <CharacterList />
    </div>
  );
}
