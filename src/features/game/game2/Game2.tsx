import { AddCharacterButton } from "./AddCharacterButton";
import { useCharacterMovement } from "./CharacterMovement";
import { CharacterList } from "./CharactersList";
import { useSocketListener } from "./soket";

export default function Game2() {
  useSocketListener();
  useCharacterMovement();

  return (
    <div>
      <AddCharacterButton />
      <CharacterList />
    </div>
  );
}
