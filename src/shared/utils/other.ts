import axios from "axios";
import { z } from "zod";
import { CONFIG } from "./constants";

function cutString(str: string, maxLength: number = 40) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
const refreshTokensSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
});

async function refreshAccessToken(): Promise<string> {
  console.log("Refreshing access token 1");

  //get items
  const refreshToken = localStorage.getItem(
    CONFIG.localStorage.kickRefreshToken
  );
  const client_secret = CONFIG.clientSecret;
  const client_id = CONFIG.clientId;

  console.log("Refreshing access token 2");
  if (!refreshToken) throw new Error("No refresh token");

  console.log("Refreshing access token 3");
  const response = await axios.post(`${process.env.BACKEND_URL}/kick/refresh`, {
    refresh_token: refreshToken,
    client_id: client_id,
    client_secret: client_secret,
    grant_type: "refresh_token",
  });

  console.log("tokens---", response.data);
  console.log("Refreshing access token 4");

  const parsedResponse = refreshTokensSchema.safeParse(response.data);

  if (!parsedResponse.success) throw new Error("Invalid response");

  console.log("Refreshing access token 5");
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
  console.log("Refreshing access token 6");

  return data.access_token;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export { cutString, generateId, refreshAccessToken };
