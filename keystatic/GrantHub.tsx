import { collection, fields } from "@keystatic/core";

export const Updates = collection({
  label: "Updates",
  slugField: "title",
  path: "src/content/Updates/*/",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    label: fields.text({ label: "Label" }),
    description: fields.text({ label: "Description", multiline: true }),
    image: fields.image({
      label: "Image",
      directory: "src/assets/images/Updates",
      publicPath: "@assets/images/Updates/",
    }),
    type: fields.select({
      label: "Type",
      options: [
        { value: "foundation-grants", label: "Foundation Grants" },
        { value: "quest-book", label: "Quest Book" },
        { value: "rfp", label: "R.F.P" },
        { value: "thrive", label: "Thrive" },
        { value: "uniswap", label: "Uniswap" },
      ],
      defaultValue: "foundation-grants",
    }),

    externalUrl: fields.url({ label: "External Url" }),
    content: fields.markdoc({
      label: "Content",
      extension: "md",
      options: {
        image: {
          directory: "src/assets/images/Updates",
          publicPath: "/src/assets/images/Updates/",
        },
      },
    }),
  },
});
