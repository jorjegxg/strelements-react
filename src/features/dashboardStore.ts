import { create } from "zustand";

interface Dashboard {
    isLive: boolean
    setIsLive: (isLive: boolean) => void
}

 const useDasboardStore = create<Dashboard>((set) => ({
    isLive: false,
    setIsLive: (isLive) => set((state) => ({ ...state, isLive })),
}));

     
export { useDasboardStore };


