// src/stores/useEffectStore.ts
import { create } from "zustand"; // sau unde ai schema
import { Effect, EffectListSchema } from "./schema";

interface EffectStore {
  effects: Effect[];
  loading: boolean;
  error: string | null;
  fetchEffects: () => Promise<void>;
}

export const useEffectStore = create<EffectStore>((set) => ({
  effects: [],
  loading: false,
  error: null,

  fetchEffects: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/effects`);
      const data = await res.json();

      const parsed = EffectListSchema.safeParse(data);
      if (!parsed.success) {
        console.error(parsed.error);
        set({ error: "Date invalide", loading: false });
        return;
      }

      console.log(parsed.data);

      set({ effects: parsed.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Eroare la fetch", loading: false });
    }
  },
}));
