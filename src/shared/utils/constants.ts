const CONFIG = {
  localStorage: {
    kickaAcessToken: "kickaAcessToken",
    pkce_verifier: "pkce_verifier",
    kickUserId: "kickUserId",
    profile_picture: "profile_picture",
    kickUsername: "kickUsername",
    token_expires_in: "token_expires_in",
    refresh_token: "refresh_token",
  },
  scopes:
    "user:read channel:read channel:write chat:write streamkey:read events:subscribe",
  authUrl: "https://id.kick.com/oauth/authorize",

  clientId: process.env.KICK_CLIENT_ID!,
  clientSecret: process.env.KICK_CLIENT_SECRET!,
};

export { CONFIG };
