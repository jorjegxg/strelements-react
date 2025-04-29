import { useCharacterStore } from "../characterStore";

export const AddCharacterButton = () => {
  const addOrUpdateCharacter = useCharacterStore(
    (state) => state.addOrUpdateCharacter
  );

  const handleMessage = (id: number, message: string, name: string) => {
    addOrUpdateCharacter(id, message, name);
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     handleMessage(Math.floor(Math.random() * 1000) + 1, "Salut!", "Mama ta");
  //   }, 1000);

  //   // cleanup: când componenta se distruge, oprește intervalul
  //   return () => clearInterval(intervalId);
  // }, []);

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
