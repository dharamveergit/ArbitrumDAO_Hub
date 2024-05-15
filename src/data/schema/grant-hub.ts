import { defineCollection, z } from "astro:content";

export const Grants = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      grantType: z
        .union([z.literal("Program"), z.literal("Project")])
        .optional(),
      description: z.string().optional(),
      date: z.date().optional(),
      status: z.string().optional(),
      amount: z.string().optional(),
      buttons: z
        .array(
          z.object({
            text: z.string(),
            link: z.string(),
            type: z.union([z.literal("default"), z.literal("secondary")]),
          }),
        )
        .optional(),
      askBy: z.string().optional(),
      ApprovedOn: z.string().optional(),
      externalUrl: z.string().optional(),
      category: z.array(z.string()).optional(),
      image: image().optional(),
      type: z.union([
        z.literal("Home"),
        z.literal("Grant"),
        z.literal("Update"),
        z.literal("SubHome"),
      ]),
      grants: z
        .object({
          title: z.string(),
          description: z.string().optional(),
          buttons: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
                type: z.union([z.literal("default"), z.literal("secondary")]),
              }),
            )
            .optional(),
        })
        .optional(),
      update: z
        .object({
          title: z.string(),
          description: z.string().optional(),
          buttons: z
            .array(
              z.object({
                text: z.string(),
                link: z.string(),
                type: z.union([z.literal("default"), z.literal("secondary")]),
              }),
            )
            .optional(),
        })
        .optional(),
      label: z.string().optional(),
      uagp: z.string().optional(),
      allocation: z.string().optional(),
      available: z.string().optional(),
      approved: z.string().optional(),
      overview: z.string().optional(),
      points: z.array(z.string()).optional(),
      links: z
        .object({
          website: z.string().optional(),
          twitter: z.string().optional(),
          github: z.string().optional(),
          discord: z.string().optional(),
          telegram: z.string().optional(),
          youtube: z.string().optional(),
        })
        .optional(),
      collection: z.string().optional(),
      subCollection: z.string().optional(),
      fundingAsk: z.string().optional(),
      walletAddress: z.string().optional(),
      manager: z
        .object({
          name: z.string(),
          url: z.string().optional(),
        })
        .optional(),
      connect: z
        .object({
          type: z.union([
            z.literal("discord"),
            z.literal("telegram"),
            z.literal("email"),
            z.literal("twitter"),
          ]),
          url: z.string(),
          name: z.string(),
        })
        .optional(),
    }),
});
