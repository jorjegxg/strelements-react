import axios from 'axios';
import { create } from 'zustand';

interface SwitchStore {
  isActive: boolean;
  toggleState: () => void;
}

export const useSwitchStore = create<SwitchStore>((set, get) => ({
  isActive: false,

  toggleState: async () => {

    ////
    //TODO: nu trebuie sa poti lua din local storage fara sa fii logat

    const token = localStorage.getItem("access_token",);
    ///

    const currentState = get().isActive;
    const newState = !currentState;

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/toggle`, { isActive: newState, accessToken: token });
      console.log('API Response:', response.data);
      set({ isActive: newState });
    } catch (error) {
      console.error('API Request failed:', error);
    }
  },
}));
