import { create } from "zustand";

export interface Dashboard {
    isLive: boolean
    setIsLive: (isLive: boolean) => void
}

export const useDasboardStore = create<Dashboard>((set) => ({
    isLive: false,
    setIsLive: (isLive) => set((state) => ({ ...state, isLive })),
}));


