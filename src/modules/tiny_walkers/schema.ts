import { z } from "zod";

export const CharacterSchema = z.object({
  id: z.number(),
  app_user_id: z.number(),
  effect_id: z.number(),
  settings: z.tuple([
    z.string().regex(/^#[0-9a-fA-F]{6}$/, "Culoare HEX invalidă"), // #000000
    z.string().regex(/^#[0-9a-fA-F]{6}$/),
    z.string().regex(/^#[0-9a-fA-F]{6}$/),
    z.string().regex(/^\d+(\.\d+)?$/, "Valoare numerică invalidă"), // "0.5"
    z.string().regex(/^\d+(\.\d+)?$/),
    z.string().regex(/^\d+(\.\d+)?$/),
  ]),
});
