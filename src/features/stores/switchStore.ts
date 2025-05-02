/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "react-toastify";
import { create } from "zustand";
import { api } from "../../shared/utils/autoRefresh";

interface SwitchStore {
  isActive: boolean;
  isLoading: boolean;
  error: string;
  toggleState: () => void;
  getEffectsState: () => void;
}

export const useSwitchStore = create<SwitchStore>((set, get) => ({
  isActive: false,
  isLoading: false,
  error: "",
  toggleState: async () => {
    set({ isLoading: true });

    const currentState = get().isActive;
    const newState = !currentState;

    try {
      await api.post(`${process.env.BACKEND_URL}/toggle`, {
        isActive: newState,
      });

      if (newState) {
        toast.success("Effect activated");
      } else {
        toast.error("Effect deactivated");
      }

      set({ isActive: newState, isLoading: false });
    } catch (error) {
      set({ error: "API Request failed", isLoading: false });
    }
  },
  getEffectsState: async () => {
    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.BACKEND_URL}/effects-state`
      );

      set({ isActive: response.data.isActive, isLoading: false });
    } catch (error) {
      set({ error: "API Request failed", isLoading: false });
    }
  },
}));
