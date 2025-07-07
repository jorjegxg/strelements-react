// src/stores/useEffectStore.ts
import { create } from "zustand"; // sau unde ai schema
import { Effect, EffectListSchema, EffectSchema } from "./schema";

interface EffectStore {
  effects: Effect[];
  loading: boolean;
  error: string | null;
  fetchEffects: () => Promise<void>;
  fetchEffect: (name: string) => Promise<void>;
  title: string;
  name: string;
  description: string;
  videoUrl: string;
}

export const useEffectStore = create<EffectStore>((set, get) => ({
  effects: [],
  loading: false,
  error: null,
  title: "",
  name: "",
  description: "",
  videoUrl: "",

  fetchEffects: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/effects`);
      const data = await res.json();

      const parsed = EffectListSchema.safeParse(data);
      if (!parsed.success) {
        console.error(parsed.error);
        set({ error: "Invalid data", loading: false });
        return;
      }

      console.log(parsed.data);

      set({ effects: parsed.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Something went wrong", loading: false });
    }
  },

  fetchEffect: async (name: string) => {
    set({ loading: true, error: null });
    console.log("name -- " + name);
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/effect?name=${name}`);
      const data = await res.json();

      const parsed = EffectSchema.safeParse(data);
      if (!parsed.success) {
        console.error(parsed.error);
        set({ error: "Invalid data", loading: false });
        return;
      }

      get().title = parsed.data.title;
      get().name = parsed.data.name;
      get().description = parsed.data.description;
      get().videoUrl = parsed.data.video_url;
      set({ loading: false });
    } catch (err) {
      console.error(err);
      set({ error: "Something went wrong", loading: false });
    }
  },
}));
