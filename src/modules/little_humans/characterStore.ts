import { create } from "zustand";
const timeForCharacter = 13 * 1000;
const timeForChat = 6 * 1000;
type Character = {
  id: number;
  name: string;
  zIndex: number;
  x: number;
  message: string;
  emoji: string;
};

type Store = {
  lastZIndex: number;
  characters: Character[];
  timers: Record<number, ReturnType<typeof setTimeout>>;
  messageTimers: Record<number, ReturnType<typeof setTimeout>>;

  addOrUpdateCharacter: (id: number, message: string, name: string) => void;
  removeCharacter: (id: number) => void;
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
  lastZIndex: 0,
  characters: [],

  timers: {},
  messageTimers: {},

  addOrUpdateCharacter: (id, message, name) => {
    const { characters, timers, messageTimers } = get();
    const existingChar = characters.find((char) => char.id === id);

    // Dacă caracterul există, actualizăm mesajul
    if (existingChar) {
      set({
        characters: characters.map((char) =>
          char.id === id ? { ...char, message } : char
        ),
      });
    } else {
      const index = get().lastZIndex++;
      const randomX = Math.floor(Math.random() * window.innerWidth);

      // Dacă NU există, îl adăugăm
      const newCharacter: Character = {
        id,
        name: name,
        zIndex: index,
        x: randomX,
        message,
        emoji: getEmoji(name),
      };
      set({ characters: [...characters, newCharacter], lastZIndex: index });
    }

    // Dacă exista un timer, îl anulăm
    if (timers[id]) clearTimeout(timers[id]);

    // Setăm un nou timeout pentru a elimina caracterul după X secunde (ex: 10s)
    const timeout = setTimeout(() => {
      get().removeCharacter(id);
    }, timeForCharacter);

    if (messageTimers[id]) clearTimeout(messageTimers[id]);
    const msgTimeout = setTimeout(() => {
      set({
        characters: get().characters.map((char) =>
          char.id === id ? { ...char, message: "" } : char
        ),
      });
    }, timeForChat); // 3 secunde

    // Salvăm noul timer
    set({
      timers: { ...timers, [id]: timeout },
      messageTimers: { ...messageTimers, [id]: msgTimeout },
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...restTimers } = timers;
      set({ timers: restTimers });
    }
  },

  moveCharactersRandomly: () => {
    const screenWidth = window.innerWidth;
    const characterWidth = 150; // ajustează dacă știi dimensiunea exactă

    set((state) => ({
      characters: state.characters.map((char) => {
        // Mutare aleatoare între -50 și +50 px
        const deltaX = Math.floor(Math.random() * 101) - 50;
        const newX = char.x + deltaX;

        // Ne asigurăm că nu iese în afara ecranului
        const clampedX = Math.max(
          0,
          Math.min(newX, screenWidth - characterWidth)
        );

        return {
          ...char,
          x: clampedX,
        };
      }),
    }));
  },
}));
