import axios from "axios";
import { CONFIG } from "./constants";
import { refreshAccessToken } from "./other";

const api = axios.create();

api.interceptors.request.use(async (config) => {
  console.log("Request interceptor called 1");

  let accessToken = localStorage.getItem(CONFIG.localStorage.kickAcessToken);
  const expiresAt = Number(
    localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
  );
  console.log("Request interceptor called 2");

  if (!accessToken || !expiresAt || Date.now() > expiresAt) {
    try {
      console.log("Request interceptor called 3");
      accessToken = await refreshAccessToken();
    } catch (error) {
      console.log("Request interceptor called 4");
      console.error("Token refresh failed", error);
      throw error; // Sau redirect la login
    }
  }

  console.log("Request interceptor called 5");

  console.log("NEW ACCESS TOKEN : ", accessToken);

  config.headers = config.headers || {};
  config.headers.set("Authorization", `${accessToken}`);

  return config;
});

export default api;
