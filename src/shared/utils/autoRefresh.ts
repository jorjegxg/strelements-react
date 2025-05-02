import axios from "axios";
import { CONFIG } from "./constants";
import { refreshTokensSchema } from "./schemas";

const api = axios.create();

api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem(CONFIG.localStorage.kickAcessToken);
  const expiresAt = Number(
    localStorage.getItem(CONFIG.localStorage.kickTokenExpiresAt)
  );

  if (!accessToken || !expiresAt || Date.now() > expiresAt) {
    accessToken = await refreshAccessToken();
  }

  config.headers = config.headers || {};
  config.headers.set("Authorization", `${accessToken}`);

  return config;
});

async function refreshAccessToken(): Promise<string> {
  //get items
  const refreshToken = localStorage.getItem(
    CONFIG.localStorage.kickRefreshToken
  );
  const client_secret = CONFIG.clientSecret;
  const client_id = CONFIG.clientId;

  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post(`${process.env.BACKEND_URL}/kick/refresh`, {
    refresh_token: refreshToken,
    client_id: client_id,
    client_secret: client_secret,
    grant_type: "refresh_token",
  });

  const parsedResponse = refreshTokensSchema.safeParse(response.data);

  if (!parsedResponse.success) throw new Error("Invalid response");

  const data = parsedResponse.data;

  localStorage.setItem(CONFIG.localStorage.kickAcessToken, data.access_token);
  localStorage.setItem(
    CONFIG.localStorage.kickRefreshToken,
    data.refresh_token
  );
  localStorage.setItem(
    CONFIG.localStorage.kickTokenExpiresAt,
    (Date.now() + data.expires_in * 1000).toString()
  );

  return data.access_token;
}

export { api, refreshAccessToken };
