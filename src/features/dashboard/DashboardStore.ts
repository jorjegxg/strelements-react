import { create } from "zustand";

interface Store {
    isLive: boolean
    setIsLive: (isLive: boolean) => void
}

const useDasboardStore = create<Store>((set) => ({
    isLive: false,
    setIsLive: (isLive) => set((state) => ({ ...state, isLive })),
}));

export default useDasboardStore;
