import { cardSchema, refinedCardSchema } from "@/data/schema/cards";
import type { ZodRawShape } from "astro/zod";
import { defineCollection, z, type ImageFunction } from "astro:content";

export const contributions = defineCollection({
  type: "content",
  schema: ({ image }) => refinedCardSchema(image),
});

export const events = defineCollection({
  type: "content",

  schema: ({ image }) => {
    return cardSchema(image).extend({
      date: z.date().optional(),
      endDate: z.date().optional(),
      links: z
        .object({
          twitter: z.string().optional(),
          discord: z.string().optional(),
          github: z.string().optional(),
        })
        .optional(),
    });
  },
});

export const ambassadors = defineCollection({
  type: "content",

  schema: ({ image }) => {
    return z.object({
      // category: z.union([
      //   z.literal("contribution"),
      //   z.literal("gallery"),
      //   z.literal("event"),
      //   z.literal("profile"),
      //   z.literal("achievement"),
      // ]),
      title: z.string().optional(),
      description: z.string().optional(),
      image: image().optional(),
      externalUrl: z.string().optional(),
      label: z.string().optional(),
      tag: z.string().optional(),
      location: z.string().optional(),
      date: z.date().optional(),
      links: z
        .object({
          twitter: z.string().optional(),
          discord: z.string().optional(),
          github: z.string().optional(),
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            img: image(),
            imgBy: z.string(),
          }),
        )
        .optional(),
    });
  },
});
