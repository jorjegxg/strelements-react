import { useEffect } from "react";
import { useCharacterStore } from "./characterStore";

export const useCharacterMovement = () => {
  const moveCharactersRandomly = useCharacterStore((s) => s.moveCharactersRandomly);

  useEffect(() => {
    const interval = setInterval(() => {
      moveCharactersRandomly();
    }, 2000); // La fiecare 2 secunde

    return () => clearInterval(interval);
  }, []);
};
