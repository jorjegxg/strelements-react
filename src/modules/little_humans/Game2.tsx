import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddCharacterButton } from "./components/AddCharacterButton";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
import { useChatSoket } from "./soket";

export default function Game2() {
  const { sessionId } = useParams();
  useEffect(() => {
    console.log("sessionId", sessionId);
  }, []);
  useChatSoket(sessionId!);
  useCharacterMovement();

  return (
    <div>
      <AddCharacterButton />
      <CharacterList />
    </div>
  );
}
