import type { ZodRawShape } from "astro/zod";
import type { ImageFunction } from "astro:content";

import { z } from "astro:content";

export const cardSchema = (image: ImageFunction) =>
  z.object({
    title: z.string(),
    description: z.string(),
    image: image().optional(),
    externalUrl: z.string().optional(),
    label: z.string().optional(),
    tag: z.string().optional(),
  });

export const refinedCardSchema = (image: ImageFunction) => {
  return cardSchema(image).refine((data) => {
    return true;
  }, "image is required for event cards");
};
