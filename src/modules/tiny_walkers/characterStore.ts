import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CONFIG } from "@/shared/utils/constants";
import axios from "axios";
import { Character } from "../../shared/utils/schemas";
import { TinyWalkersSettings } from "./classes";

const timeForCharacter = 13 * 1000;
const timeForChat = 6 * 1000;

interface PersistentSettings {
  nameBackgroundColor: string;
  messageBackgroundColor: string;
  messageColor: string;
  size: number;
  messageSize: number;
  nameSize: number;
}

interface TemporaryState {
  lastZIndex: number;
  characters: Character[];
  timers: Record<number, ReturnType<typeof setTimeout>>;
  messageTimers: Record<number, ReturnType<typeof setTimeout>>;
}

interface Store extends PersistentSettings, TemporaryState {
  setNameBackgroundColor: (color: string) => void;
  setMessageBackgroundColor: (color: string) => void;
  setMessageColor: (color: string) => void;
  setSize: (size: number) => void;
  setMessageSize: (size: number) => void;
  setNameSize: (textSize: number) => void;

  addOrUpdateCharacter: (id: number, message: string, name: string) => void;
  removeCharacter: (id: number) => void;
  moveCharactersRandomly: () => void;

  updateInDb: (effectName: string) => void;
}

const getEmoji = (name: string) => {
  const emojis = ["🧙‍♂️", "🧛", "🧟", "🤖", "🧑", "🐸", "🐱", "👾"];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return emojis[hash % emojis.length];
};

export const useCharacterStore = create<Store>()(
  persist(
    (set, get) => ({
      nameBackgroundColor: "#000000",
      messageBackgroundColor: "#f3f3f3",
      messageColor: "#263238",
      size: 1,
      messageSize: 1,
      nameSize: 1,
      setNameBackgroundColor: (color) => set({ nameBackgroundColor: color }),
      setMessageBackgroundColor: (color) =>
        set({ messageBackgroundColor: color }),
      setMessageColor: (color) => set({ messageColor: color }),
      setSize: (size) => set({ size }),
      setMessageSize: (size) => set({ messageSize: size }),
      setNameSize: (textSize) => set({ nameSize: textSize }),

      lastZIndex: 0,
      characters: [],

      timers: {},
      messageTimers: {},

      addOrUpdateCharacter: (id, message, name) => {
        const { characters, timers, messageTimers } = get();
        const existingChar = characters.find((char) => char.id === id);
        const index = get().lastZIndex++;

        // Dacă caracterul există, actualizăm mesajul
        if (existingChar) {
          set({
            characters: characters.map((char) =>
              char.id === id ? { ...char, message, zIndex: index } : char
            ),
          });
        } else {
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
          set({
            characters: [...characters, newCharacter],
            lastZIndex: index,
          });
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

      updateInDb: async (effectName: string) => {
        try {
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////
          const app_user_id = Number(
            localStorage.getItem(CONFIG.localStorage.appUserId)
          );

          console.log("app_user_id -- " + app_user_id);

          const effectSettings = new TinyWalkersSettings({
            nameBackgroundColor: get().nameBackgroundColor,
            messageBackgroundColor: get().messageBackgroundColor,
            messageColor: get().messageColor,
            size: get().size,
            messageSize: get().messageSize,
            nameSize: get().nameSize,
          });

          const response = await axios.put(
            `${process.env.BACKEND_URL}/tiny-walkers/settings`,
            {
              app_user_id: app_user_id,
              effect_name: effectName,
              settings: effectSettings.makeArray(),
            }
          );

          console.log(response.data);
        } catch (error) {
          console.error("Eroare la actualizarea datelor:", error);
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
    }),

    {
      name: "app-settings", // Cheia unică pentru localStorage
      storage: createJSONStorage(() => localStorage), // (optional) implicit este localStorage
      partialize: (state) => ({
        // Specificăm doar câmpurile care trebuie persistate
        nameBackgroundColor: state.nameBackgroundColor,
        messageBackgroundColor: state.messageBackgroundColor,
        messageColor: state.messageColor,
        size: state.size,
        messageSize: state.messageSize,
        nameSize: state.nameSize,
      }),
    }
  )
);
