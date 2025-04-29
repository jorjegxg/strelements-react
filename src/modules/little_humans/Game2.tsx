import { AddCharacterButton } from "./components/AddCharacterButton";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
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
