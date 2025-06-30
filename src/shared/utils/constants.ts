const CONFIG = {
  localStorage: {
    kickAcessToken: "kickAcessToken",
    pkceVerifier: "pkceVerifier",
    kickUserId: "kickUserId",
    profilePicture: "profilePicture",
    kickUsername: "kickUsername",
    kickTokenExpiresAt: "kickTokenExpiresAt",
    kickRefreshToken: "kickRefreshToken",
    appUserId: "appUserId",
  },
  scopes:
    "user:read channel:read channel:write chat:write streamkey:read events:subscribe",
  authUrl: "https://id.kick.com/oauth/authorize",

  clientId: process.env.KICK_CLIENT_ID!,
  clientSecret: process.env.KICK_CLIENT_SECRET!,
  nodeEnv: process.env.NODE_ENV,
  SUCCESS_URL: process.env.SUCCESS_URL!,
  CANCEL_URL: process.env.CANCEL_URL!,
};

export { CONFIG };
