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

const channelSchema = z.object({
  data: z.array(
    z.object({
      broadcaster_user_id: z.number(),
      slug: z.string(),
      channel_description: z.string(),
      banner_picture: z.string(),
      stream: z.object({
        url: z.string(),
        key: z.string(),
        is_live: z.boolean(),
        is_mature: z.boolean(),
        language: z.string(),
        start_time: z.string(),
        viewer_count: z.number(),
        thumbnail: z.string(),
      }),
      stream_title: z.string(),
      category: z.object({
        id: z.number(),
        name: z.string(),
        thumbnail: z.string(),
      }),
    })
  ),
  message: z.string(),
});

export { channelSchema, Character, refreshTokensSchema };
