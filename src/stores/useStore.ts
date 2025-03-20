import { create } from 'zustand';

interface Post {
  message: string;
}

interface Store {
  data: Post | null;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

const useStore = create<Store>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${process.env.BACKEND_URL}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Post = await response.json();
      set({ data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
