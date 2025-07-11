import { z } from "zod";

export const EffectSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  image_path: z.string(),
  title: z.string(),
  description: z.string(),
  video_url: z.string(),
});

export type Effect = z.infer<typeof EffectSchema>;
export const EffectListSchema = z.array(EffectSchema);
