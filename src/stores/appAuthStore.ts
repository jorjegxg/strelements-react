import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import { CONFIG } from "../utils/constants";

interface AppAuthState {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  userLogin: () => Promise<void>;
  logout: () => void;
}
const userSchema = z.object({
  data: z.object({
    authData: z.object({
      access_token: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      scope: z.string(),
      token_type: z.string(),
    }),
    client_id: z.string(),
  }),
});

export const useAppAuthStore = create<AppAuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: "",

  userLogin: async () => {
    set({ isLoading: true });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const verifier = localStorage.getItem(CONFIG.pkce_verifier);

      let url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;

      console.log('1')
      
      console.log('url :' , url)
      console.log('authorizationCode :' , code)
      console.log('codeVerifier :' , verifier)
      const response = await axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      });
      
      console.log('2')
      userSchema.parse(response);
      console.log('3')
      
      localStorage.setItem(
        CONFIG.localStorage.accessToken,
        response.data.authData.access_token
      );
      console.log('4')

      console.log(
        "Tokenul de autentificare:",
        response.data.authData.access_token
      );

      set({ isAuthenticated: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erori Zod:", error.errors);

        error.errors.forEach((issue) => {
          console.error(`Eroare la ${issue.path.join(".")}: ${issue.message}`);
        });
      } else {
        console.error("Altă eroare:", error);
      }

      set({ error: "Token exchange error" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem(CONFIG.localStorage.accessToken);
    set({ isAuthenticated: false });
  },
}));
