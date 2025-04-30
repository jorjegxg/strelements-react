import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "../../shared/utils/auth_functions";
import { CONFIG } from "../../shared/utils/constants";

interface AppAuthState {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;

  getKickAuthToken: () => Promise<void>;
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
    user: z.object({
      user_id: z.number(),
      name: z.string(),
      email: z.string().email(),
      profile_picture: z.string().url(),
    }),
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

  getKickAuthToken: async () => {
    set({ isLoading: true });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const verifier = localStorage.getItem(CONFIG.localStorage.pkce_verifier);

      const url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;
      const response = await axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      });

      const parsedResponse = userSchema.parse(response);

      localStorage.setItem(
        CONFIG.localStorage.kickaAcessToken,
        parsedResponse.data.authData.access_token
      );
      localStorage.setItem(
        CONFIG.localStorage.token_expires_in,
        parsedResponse.data.authData.expires_in.toString()
      );
      localStorage.setItem(
        CONFIG.localStorage.refresh_token,
        parsedResponse.data.authData.refresh_token
      );
      localStorage.setItem(
        CONFIG.localStorage.profile_picture,
        parsedResponse.data.user.profile_picture
      );
      localStorage.setItem(
        CONFIG.localStorage.kickUsername,
        parsedResponse.data.user.name
      );

      localStorage.setItem(
        CONFIG.localStorage.kickUserId,
        parsedResponse.data.user.user_id.toString()
      );

      console.log(
        "Tokenul de autentificare:",
        parsedResponse.data.authData.access_token
      );

      console.log("User ID:", response.data.user.user_id);

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
    localStorage.removeItem(CONFIG.localStorage.kickaAcessToken);
    localStorage.removeItem(CONFIG.localStorage.pkce_verifier);
    localStorage.removeItem(CONFIG.localStorage.kickUserId);
    set({ isAuthenticated: false });
  },
}));
