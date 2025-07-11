import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { colors2 } from "../../shared/utils/colors";
import { useCharacterStore } from "./characterStore";
import { AddCharacterButton } from "./components/AddCharacterButton";
import { useCharacterMovement } from "./components/CharacterMovement";
import { CharacterList } from "./components/CharactersList";
import { useChatSoket } from "./soket";

///////////////////////deeeeci , linkul o sa fie format din : id-ul global al userului, de acolo iei ala kick
export default function Game2() {
  const platform = "kick";
  const { sessionId, isPreview } = useParams();

  useChatSoket(sessionId!);
  useCharacterMovement();

  const isForPreview = isPreview != null;

  const getEffectSettings2 = useCharacterStore(
    (state) => state.getEffectSettings2
  );

  useEffect(() => {
    getEffectSettings2("tiny-walkers", Number(sessionId));
  }, []);

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
