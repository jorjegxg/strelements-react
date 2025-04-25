import { create } from "zustand";

type Character = {
  id: number;
  name: string;
  zIndex: number;
  x: number;
  message: string;
  emoji: string;
};

type Store = {
  characters: Character[];
  timers: Record<number, ReturnType<typeof setTimeout>>; // ținem timeout-urile per user_id
  addOrUpdateCharacter: (id: number, message: string , name:string) => void;
  removeCharacter: (id: number) => void;
  setCharacters: (chars: Character[]) => void;
  moveCharactersRandomly: () => void;
};

const getEmoji = (name: string) => {
  const emojis = ["🧙‍♂️", "🧛", "🧟", "🤖", "🧑‍🚀", "🐸", "🐱", "👾"];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return emojis[hash % emojis.length];
};


export const useCharacterStore = create<Store>((set, get) => ({
  characters: [],
  timers: {},

  setCharacters: (chars) => set({ characters: chars }),

  addOrUpdateCharacter: (id, message, name) => {
    const { characters, timers } = get();
    const existingChar = characters.find((char) => char.id === id);

    // Dacă caracterul există, actualizăm mesajul
    if (existingChar) {
      set({
        characters: characters.map((char) =>
          char.id === id ? { ...char, message } : char
        ),
      });
    } else {
      // Dacă NU există, îl adăugăm
      const newCharacter: Character = {
        id,
        name: name,
        zIndex: Math.floor(Math.random() * 100),
        x: Math.floor(Math.random() * 300) + 100,
        message,
        emoji: getEmoji(name),
      };
      set({ characters: [...characters, newCharacter] });
    }

    // Dacă exista un timer, îl anulăm
    if (timers[id]) clearTimeout(timers[id]);

    // Setăm un nou timeout pentru a elimina caracterul după X secunde (ex: 10s)
    const timeout = setTimeout(() => {
      get().removeCharacter(id);
    }, 100000); // 100 secunde

    // Salvăm noul timer
    set({
      timers: { ...timers, [id]: timeout },
    });
  },

  removeCharacter: (id) => {
    const { characters, timers } = get();
    // Ștergem caracterul
    set({
      characters: characters.filter((char) => char.id !== id),
    });

    // Ștergem timerul asociat
    if (timers[id]) {
      clearTimeout(timers[id]);
      const { [id]: _, ...restTimers } = timers;
      set({ timers: restTimers });
    }
  },

  moveCharactersRandomly: () => {
    const screenWidth = window.innerWidth;
    const characterWidth = 150; // sau cât are efectiv elementul tău (px)
  
    set((state) => ({
      characters: state.characters.map((char) => {
        // Mutare aleatoare între -50 și +50
        const deltaX = Math.floor(Math.random() * 100) - 50;
        const newX = char.x + deltaX;
  
        // Clamping: ne asigurăm că noua poziție e între 0 și screenWidth - characterWidth
        const clampedX = Math.max(0, Math.min(newX, screenWidth - characterWidth));
  
        return {
          ...char,
          x: clampedX,
        };
      }),
    }));
  },
  
}));


