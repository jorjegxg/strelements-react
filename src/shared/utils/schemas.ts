import { z } from "zod";

const refreshTokensSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  token_type: z.string(),
});

type Character = {
  id: number;
  name: string;
  zIndex: number;
  x: number;
  message: string;
  emoji: string;
};

export { Character, refreshTokensSchema };
