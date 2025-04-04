import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      "KICK_CLIENT_ID",
      "BACKEND_URL",
      "KICK_CLIENT_SECRET",
      "FRONTEND_URL",
      "WEBSOKET_URL",
    ]),
  ],
});
