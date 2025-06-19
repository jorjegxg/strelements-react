import { create } from "zustand";

interface DonationState {
  selectedAmount: number | null;
  customAmount: string;
  donorName: string;
  message: string;
  isAnonymous: boolean;
  setSelectedAmount: (amount: number | null) => void;
  setCustomAmount: (amount: string) => void;
  setDonorName: (name: string) => void;
  setMessage: (message: string) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  resetForm: () => void;
}

const useDonationStore = create<DonationState>((set) => ({
  selectedAmount: null,
  customAmount: "",
  donorName: "",
  message: "",
  isAnonymous: false,
  setSelectedAmount: (amount) =>
    set({ selectedAmount: amount, customAmount: "" }),
  setCustomAmount: (amount) =>
    set({ customAmount: amount, selectedAmount: null }),
  setDonorName: (name) => set({ donorName: name }),
  setMessage: (message) => set({ message }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),
  resetForm: () =>
    set({
      selectedAmount: null,
      customAmount: "",
      donorName: "",
      message: "",
      isAnonymous: false,
    }),
}));

export default useDonationStore;
