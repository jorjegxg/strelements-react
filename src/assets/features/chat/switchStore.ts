import axios from 'axios';
import { create } from 'zustand';
import { CONFIG } from '../../../utils/constants';

interface SwitchStore {
  isActive: boolean;
  isLoading: boolean;
  error: string;
  toggleState: () => void;

}

export const useSwitchStore = create<SwitchStore>((set, get) => ({
  isActive: false,
  isLoading: false,
  error: '',
  toggleState: async () => {
    set({ isLoading: true });

    const token =
      localStorage.getItem(CONFIG.accessToken);


    const currentState = get().isActive;
    const newState = !currentState;

    try {
      const response = await axios.post(`${process.env.BACKEND_URL}/toggle`, { isActive: newState, accessToken: `${token}`, }, {
      });
      console.log('API Response:', response.data);
      set({ isActive: newState, isLoading: false });
    } catch (error) {
      set({ error: 'API Request failed', isLoading: false });
      console.error('API Request failed:', error);
    }
  },
}));
