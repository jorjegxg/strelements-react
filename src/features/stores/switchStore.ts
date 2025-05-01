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

    console.log("Toggling state:", newState);

    try {
      const response = await api.post(`${process.env.BACKEND_URL}/toggle`, {
        isActive: newState,
      });
      console.log("API Response:", response.data);

      if (newState) {
        toast.success("Effect activated");
      } else {
        toast.error("Effect deactivated");
      }

      set({ isActive: newState, isLoading: false });
    } catch (error) {
      set({ error: "API Request failed", isLoading: false });
      console.error("API Request failed:", error);
    }
  },
  getEffectsState: async () => {
    console.log("Fetching effects state...");
    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.BACKEND_URL}/effects-state`
      );
      console.log("API Response:", response.data);

      set({ isActive: response.data.isActive, isLoading: false });
    } catch (error) {
      set({ error: "API Request failed", isLoading: false });
      console.error("API Request failed:", error);
    }
  },
}));
