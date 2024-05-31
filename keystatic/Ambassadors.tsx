import { collection, fields } from "@keystatic/core";

export const Ambassadors = collection({
  label: "Ambassadors",
  slugField: "title",
  path: "src/content/Community_Ambassadors/*/",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    description: fields.text({ label: "Description", multiline: true }),
    image: fields.image({
      label: "Image",
      //add ./ to the image path
      directory: "src/assets/images/ambassadors",

      // Use the @assets path alias
      publicPath: "@assets/images/ambassadors/",
    }),

    label: fields.text({ label: "Label" }),
    location: fields.text({ label: "Location" }),
    links: fields.object({
      twitter: fields.text({ label: "Twitter" }),
    }),
    content: fields.markdoc({
      label: "Content",
      extension: "md",

      options: {
        image: {
          directory: "src/assets/images/ambassadors",
          publicPath: "/src/assets/images/ambassadors/",
        },
      },
    }),
  },
});
