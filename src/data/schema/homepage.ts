import { defineCollection, z, type ImageFunction } from "astro:content";

const tabsSchema = (image: ImageFunction) =>
  z.object({
    title: z.string(),
    description: z.string(),
    products: z.array(
      z.object({
        label: z.string(),
        title: z.string(),
        image: image(),
        subtitle: z.string(),
        description: z.string(),
        //colored title and subtitle
        url: z.string().optional(),
        colored: z
          .union([z.literal("title"), z.literal("subtitle")])
          .optional(),
      }),
    ),
  });

export const homepage = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) => {
    return z.object({
      homepage: z.object({
        heroBanner: z.object({
          title: z.string(),
          description: z.string(),
          buttons: z.array(
            z.object({
              label: z.string(),
              url: z.string(),
            }),
          ),
        }),
        userFeatures: z.object({
          title: z.string(),
          description: z.string(),
          features: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              comingSoon: z.boolean().optional(),
              link: z.string().optional(),
            }),
          ),
        }),
        intro: tabsSchema(image),
        ecosystem: tabsSchema(image),
      }),
      theHubHomePage: z.object({
        title: z.string(),
        description: z.string(),
        forYou: z.object({
          title: z.string(),
          description: z.string(),
          cards: z.array(
            z.object({
              label: z.string(),
              description: z.string(),
              image: image(),
              link: z.string(),
            }),
          ),
        }),
      }),
    });
  },
});
