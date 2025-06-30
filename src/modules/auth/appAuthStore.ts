import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import {
  generateCodeChallenge,
  generateCodeVerifier,
} from "../../shared/utils/auth_functions";
import { api } from "../../shared/utils/autoRefresh";
import { CONFIG } from "../../shared/utils/constants";

interface AppAuthState {
  error?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  status: {
    name: "idle" | "success" | "error";
    message: string;
  };

  setStatus: (name: "idle" | "success" | "error", message: string) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;

  getKickAuthToken: () => Promise<void>;
  startLoginWithKick: () => Promise<void>;
  logout: () => Promise<void>;
}
const userSchema = z.object({
  data: z.object({
    kickAuthData: z.object({
      access_token: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      scope: z.string(),
      token_type: z.string(),
    }),
    kickUser: z.object({
      user_id: z.number(),
      name: z.string(),
      email: z.string().email(),
      profile_picture: z.string().url(),
    }),
    userId: z.number(),
  }),
});

export const useAppAuthStore = create<AppAuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: "",
  status: {
    name: "idle",
    message: "",
  },
  setStatus: (name, message) => {
    set({ status: { name, message } });
  },

  startLoginWithKick: async () => {
    const verifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(verifier);

    localStorage.setItem(CONFIG.localStorage.pkceVerifier, verifier);

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
      const verifier = localStorage.getItem(CONFIG.localStorage.pkceVerifier);

      const url = `${process.env.BACKEND_URL}/kick/login/exchange-code`;

      const response = await axios.post(url, {
        authorizationCode: code,
        codeVerifier: verifier,
      });

      const parsedResponse = userSchema.parse(response);

      localStorage.setItem(
        CONFIG.localStorage.appUserId,
        parsedResponse.data.userId.toString()
      );

      const expiresIn = parsedResponse.data.kickAuthData.expires_in;
      if (expiresIn !== null) {
        const expiresAt = expiresIn * 1000 + Date.now();
        localStorage.setItem(
          CONFIG.localStorage.kickTokenExpiresAt,
          expiresAt.toString()
        );
      }

      localStorage.setItem(
        CONFIG.localStorage.kickAcessToken,
        parsedResponse.data.kickAuthData.access_token
      );

      localStorage.setItem(
        CONFIG.localStorage.kickRefreshToken,
        parsedResponse.data.kickAuthData.refresh_token
      );
      localStorage.setItem(
        CONFIG.localStorage.kickUsername,
        parsedResponse.data.kickUser.name
      );
      localStorage.setItem(
        CONFIG.localStorage.kickUserId,
        parsedResponse.data.kickUser.user_id.toString()
      );

      console.log(
        "parsedResponse.data.kickAuthData.access_token",
        parsedResponse.data.kickAuthData.access_token
      );

      get().setAuthenticated(true);

      //set status to success thru setStatus
      get().setStatus("success", "Login successful");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((issue) => {
          console.log(issue);
        });
      }

      get().setStatus("error", "Token exchange error");
      set({ error: "Token exchange error" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      const url = `${process.env.BACKEND_URL}/kick/logout`;
      await api.post(url, {
        token: localStorage.getItem(CONFIG.localStorage.kickAcessToken),
        token_hint_type: "access_token",
      });
      //////////////////
      localStorage.removeItem(CONFIG.localStorage.kickAcessToken);
      localStorage.removeItem(CONFIG.localStorage.pkceVerifier);
      localStorage.removeItem(CONFIG.localStorage.kickUserId);
      localStorage.removeItem(CONFIG.localStorage.kickUsername);
      localStorage.removeItem(CONFIG.localStorage.kickTokenExpiresAt);
      localStorage.removeItem(CONFIG.localStorage.kickRefreshToken);
      localStorage.removeItem(CONFIG.localStorage.profilePicture);
      //////////////////

      get().setStatus("success", "Logout successful");
      set({ isAuthenticated: false });
    } catch (error) {
      console.log(error);
      get().setStatus("error", "Logout error");
      set({ error: "Logout error" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
