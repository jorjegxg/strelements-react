import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { CONFIG } from "../../shared/utils/constants";

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

    const token = localStorage.getItem(CONFIG.localStorage.kickaAcessToken);

    const currentState = get().isActive;
    const newState = !currentState;

    console.log("Toggling state:", newState);

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/toggle`,
        { isActive: newState, accessToken: `${token}` },
        {}
      );
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

    const token = localStorage.getItem(CONFIG.localStorage.kickaAcessToken);

    try {
      const response = await axios.get(
        `${process.env.BACKEND_URL}/effects-state`,
        { headers: { Authorization: `${token}` } }
      );
      console.log("API Response:", response.data);

      set({ isActive: response.data.isActive, isLoading: false });
    } catch (error) {
      set({ error: "API Request failed", isLoading: false });
      console.error("API Request failed:", error);
    }
  },
}));
