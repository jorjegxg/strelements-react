const CONFIG = {
  localStorage: {
    accessToken: 'access_token',

  },
  scopes: 'user:read channel:read channel:write chat:write streamkey:read events:subscribe',
  pkce_verifier: 'pkce_verifier',
  authUrl: 'https://id.kick.com/oauth/authorize',

  clientId: process.env.KICK_CLIENT_ID!,
  clientSecret: process.env.KICK_CLIENT_SECRET!,
};


export { CONFIG };

