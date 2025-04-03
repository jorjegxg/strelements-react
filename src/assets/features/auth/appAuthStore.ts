import axios from "axios";
import { create } from "zustand";
import { CONFIG } from "../../../utils/constants";

interface AppAuthState {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  appLogin: () => Promise<void>;
  userLogin: () => Promise<void>;
  logout: () => void;
}

export const useAppAuthStore = create<AppAuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: "",

  appLogin: async () => {
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

      set({ isAuthenticated: true });

      console.log("Login successful:", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  userLogin: async () => {
    set({ isLoading: true });

    try {
      console.log('window.location.search', window.location.search);
      const urlParams = new URLSearchParams(window.location.search);
      console.log('urlParams', urlParams);
      const code = urlParams.get('code');
      console.log('code', code);
      const verifier = localStorage.getItem(CONFIG.pkce_verifier);
      console.log('verifier', verifier);

      let url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;
      console.log('url', url);

      const response = await axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      });

      console.log('Access token:', response.data.access_token);
      localStorage.setItem(CONFIG.localStorage.accessToken, response.data.access_token);

      set({ isAuthenticated: true });
    } catch (error) {
      set({ error: 'Token exchange error' });
      console.error('Token exchange error:', error);
    } finally {
      set({ isLoading: false });
    }

  },

  logout: () => {
    localStorage.removeItem(CONFIG.localStorage.accessToken);
    set({ isAuthenticated: false });
  },
}));

