import axios from "axios";
import { create } from "zustand";
import { CONFIG } from "../../../utils/constants";

interface AppAuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const useAppAuthStore = create<AppAuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  login: async () => {
    try {
      const clientId = CONFIG.clientId;
      const clientSecret = CONFIG.clientSecret;

      console.log('clientId', clientId)
      console.log('clientSecret', clientSecret);

      const response = await axios.post(
        "https://id.kick.com/oauth/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("access_token", token);

      set({ accessToken: token, isAuthenticated: true });

      console.log("Login successful:", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  logout: () => {
    set({ accessToken: null, isAuthenticated: false });
  },
}));

