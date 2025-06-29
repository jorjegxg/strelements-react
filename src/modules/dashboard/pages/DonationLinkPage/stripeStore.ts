import { CONFIG } from "@/shared/utils/constants";
import { stripePageSchema } from "@/shared/utils/schemas";
import axios from "axios";
import { create } from "zustand";

export type StripeStore = {
  connection: boolean;
  isLoading: boolean;
  error: string;

  getConnectionState: () => void;
};

export const useStripeStore = create<StripeStore>((set) => ({
  connection: false,
  isLoading: false,
  error: "",

  getConnectionState: async () => {
    set({ isLoading: true });

    const connection = await axios.get(
      `${process.env.BACKEND_URL}/stripe/connection`,
      {
        params: {
          app_user_id: localStorage.getItem(CONFIG.localStorage.appUserId),
        },
      }
    );

    const parsedData = stripePageSchema.safeParse(connection.data);

    if (parsedData.success) {
      set({ connection: parsedData.data.hasConnection });
    }

    set({ isLoading: false });
  },
}));
