import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddCharacterButton } from "./components/AddCharacterButton";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
import { useChatSoket } from "./soket";

export default function Game2() {
  const { sessionId, isPreview } = useParams();

  useEffect(() => {}, []);
  useChatSoket(sessionId!);
  useCharacterMovement();

  const isForPreview = isPreview != null;

  return (
    <div
      className={`relative w-screen h-screen flex-col justify-between ${
        isForPreview ? "bg-black" : "bg-transparent"
      }`}
    >
      {isForPreview ? <AddCharacterButton /> : <></>}

      <CharacterList />
    </div>
  );
}
