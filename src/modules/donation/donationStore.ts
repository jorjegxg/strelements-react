import { checkoutSessionSchema } from "@/shared/utils/schemas";
import axios from "axios";
import { create } from "zustand";

interface DonationState {
  selectedAmount: number | null;
  customAmount: string;
  donorName: string;
  message: string;
  isAnonymous: boolean;
  isLoading: boolean;
  error: string;
  setSelectedAmount: (amount: number | null) => void;
  setCustomAmount: (amount: string) => void;
  setDonorName: (name: string) => void;
  setMessage: (message: string) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  resetForm: () => void;
  donate: (amount: number) => Promise<void>;
}

const useDonationStore = create<DonationState>((set) => ({
  selectedAmount: null,
  customAmount: "",
  donorName: "",
  message: "",
  isAnonymous: false,
  isLoading: false,
  error: "",
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
      error: "",
    }),
  donate: async (amount: number) => {
    set({ isLoading: true, error: "" });

    try {
      //id-ul persoanei caruia vrei sa ii donezi
      const appUserId = 50;
      console.log("Calling:", `${process.env.BACKEND_URL}/stripe/donation`);
      const response = await axios.post(
        `${process.env.BACKEND_URL}/stripe/donation`,
        {
          amount: amount,
          app_user_id: appUserId,
        }
      );

      const parsedResponse = checkoutSessionSchema.safeParse(response.data);

      if (parsedResponse.success) {
        window.location.href = parsedResponse.data.url;
      }
    } catch (error) {
      set({ error: "Payment failed" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useDonationStore;
