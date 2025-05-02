import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
import { useChatSoket } from "./soket";

export default function Game2() {
  const { sessionId } = useParams();
  useEffect(() => {}, []);
  useChatSoket(sessionId!);
  useCharacterMovement();

  return (
    <div>
      <CharacterList />
    </div>
  );
}
