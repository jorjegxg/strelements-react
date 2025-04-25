import { useCharacterStore } from "./characterStore";

export const MyComponent = () => {
  const addOrUpdateCharacter = useCharacterStore((state) => state.addOrUpdateCharacter);

  const handleMessage = (id: number, message: string , name:string) => {
    addOrUpdateCharacter(id, message , name);
  };

  return <button onClick={() => handleMessage(1, "Salut!" , "Mama ta")}>Trimite</button>;
};
