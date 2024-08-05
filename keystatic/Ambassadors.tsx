import { collection, fields } from "@keystatic/core";

export const Ambassadors = collection({
  label: "Ambassadors",
  slugField: "title",
  path: "src/content/Community_Ambassadors/*/",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: { label: "Title", validation: { isRequired: true } },
    }),
    description: fields.text({
      label: "Description",
      multiline: true,
      validation: { isRequired: true },
    }),
    image: fields.image({
      label: "Image",
      //add ./ to the image path
      directory: "src/assets/images/ambassadors",

      // Use the @assets path alias
      publicPath: "@assets/images/ambassadors/",
      validation: { isRequired: true },
    }),

    label: fields.text({ label: "Label", validation: { isRequired: true } }),
    location: fields.text({
      label: "Location",
      validation: { isRequired: true },
    }),
    links: fields.object({
      twitter: fields.text({
        label: "Twitter",
        validation: { isRequired: true },
      }),
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
