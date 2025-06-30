import { CONFIG } from "@/shared/utils/constants";
import Logger from "@/shared/utils/Logger";
import { stripePageSchema } from "@/shared/utils/schemas";
import axios from "axios";
import { create } from "zustand";

export type StripeStore = {
  connection: boolean;
  isLoading: boolean;
  error: string;

  getConnectionState: () => void;
  disconnectFromStripe: () => void;
};

export const useStripeStore = create<StripeStore>((set) => ({
  connection: false,
  isLoading: false,
  error: "",

  getConnectionState: async () => {
    try {
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
    } catch (error) {
      set({ error: "Connection check failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  disconnectFromStripe: async () => {
    try {
      set({ isLoading: true });
      Logger.log("Disconnecting from Stripe...");

      await axios.post(`${process.env.BACKEND_URL}/stripe/disconnect`, {
        app_user_id: localStorage.getItem(CONFIG.localStorage.appUserId),
      });

      set({ connection: false });
    } catch (error) {
      set({ error: "Disconnect failed" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
