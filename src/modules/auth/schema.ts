import z from "zod";

export const kickUserSchema = z.object({
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

export type KickUser = z.infer<typeof kickUserSchema>;
