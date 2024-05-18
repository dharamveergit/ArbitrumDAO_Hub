import { cardSchema } from "@/data/schema/cards";
import { defineCollection, reference, z } from "astro:content";

export const contributions = defineCollection({
  type: "content",
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      description: z.string(),
      image: image().optional(),
      externalUrl: z.string().optional(),
      label: z.string().optional(),
      tag: z.string().optional(),
      type: z
        .object({
          discriminant: z.union([
            z.literal("ambassadors"),
            z.literal("wg"),
            z.literal("community"),
          ]),
          value: z.union([
            reference("Community_Ambassadors"),
            reference("Working_Groups"),
            z.literal("contributions"),
          ]),
        })
        .optional(),
    });
  },
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
