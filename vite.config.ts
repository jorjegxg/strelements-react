import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vite.dev/config/
export default defineConfig({
  base: "/strelements-react/",
  plugins: [
    react(),
    EnvironmentPlugin([
      "KICK_CLIENT_ID",
      "BACKEND_URL",
      "KICK_CLIENT_SECRET",
      "FRONTEND_URL",
      "WEBSOKET_URL",
      "STRIPE_CLIENT_ID",
      "STRIPE_REDIRECT_URL",
      "SUCCESS_URL",
      "CANCEL_URL",
      "FRONTEND_URL",
    ]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
