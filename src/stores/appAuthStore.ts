import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import { CONFIG } from "../utils/constants";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/functions";

interface AppAuthState {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;

  userLogin: () => Promise<void>;
  login: () => Promise<void>;
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

  login: async () => {
      const verifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(verifier);
  
      localStorage.setItem(CONFIG.localStorage.pkce_verifier, verifier);
  
      const redirect_uri = `${process.env.FRONTEND_URL}/callback`;
  
      const url = new URL(CONFIG.authUrl);
      url.searchParams.set("response_type", "code");
      url.searchParams.set("client_id", CONFIG.clientId!);
      url.searchParams.set("redirect_uri", redirect_uri);
      url.searchParams.set("scope", CONFIG.scopes);
      url.searchParams.set("code_challenge", codeChallenge);
      url.searchParams.set("code_challenge_method", "S256");
      url.searchParams.set("state", "random_value");
  
      window.location.href = url.toString();
    
  },

  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  userLogin: async () => {
    set({ isLoading: true });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const verifier = localStorage.getItem(CONFIG.localStorage.pkce_verifier);

      const url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;

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
    localStorage.removeItem(CONFIG.localStorage.pkce_verifier);
    set({ isAuthenticated: false });
  },
}));
