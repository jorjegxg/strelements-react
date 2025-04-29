import { useCharacterStore } from "../characterStore";

export const AddCharacterButton = () => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  const handleMessage = (id: number, message: string, name: string) => {
    addOrUpdateCharacter(id, message, name);
  };

  return (
    <button
      onClick={() =>
        handleMessage(Math.floor(Math.random() * 5000) + 1, "Salut!", "Mama ta")
      }
    >
      Trimite
    </button>
  );
};
