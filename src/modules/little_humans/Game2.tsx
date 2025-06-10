import { useParams } from "react-router-dom";
import { colors2 } from "../../shared/utils/colors";
import { AddCharacterButton } from "./components/AddCharacterButton";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
import { useChatSoket } from "./soket";

export default function Game2() {
  const { sessionId, isPreview } = useParams();

  useChatSoket(sessionId!);
  useCharacterMovement();

  const isForPreview = isPreview != null;

  return (
    <div
      className={`relative w-screen h-screen flex-col justify-between ${
        isForPreview ? "bg-black" : "bg-transparent"
      }`}
      style={{ background: colors2.transparent }}
    >
      {isForPreview ? <AddCharacterButton /> : <></>}

      <CharacterList />
    </div>
  );
}
