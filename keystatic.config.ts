import { config, fields, collection } from "@keystatic/core";

// title: "We’re headed (back) to ETH Denver! ⛰️"
// description: "Arbitrum is heading back to ETH Denver from Friday, February 23rd, to Sunday, March 3rd, and we’re excited to get together to explore, connect, collaborate, and have some fun along the way!"
// image: "./banner.webp"
// tag: "Genesis"
// label: "arbitrum technology"
// pubDate: 2024-02-23
// author: "arbitrum"

const REPO_OWNER = "dharamveergit";
const REPO_NAME = "ArbitrumDAO_Hub";

export default config({
  storage: {
    kind: "github",
    repo: `${REPO_OWNER}/${REPO_NAME}`,
  },

  collections: {
    posts: collection({
      label: "Blogs",
      slugField: "title",
      path: "src/content/blogs/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          //add ./ to the image path
          directory: "src/assets/images/blogs",

          // Use the @assets path alias
          publicPath: "@assets/images/blogs/",
        }),
        tag: fields.text({ label: "Tag" }),
        label: fields.text({ label: "Label" }),
        pubDate: fields.date({ label: "Publication Date" }),
        author: fields.text({ label: "Author" }),

        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "public/images/blogs",

              // Use the @assets path alias
              publicPath: "/images/blogs/",
            },
          },
        }),
      },
    }),

    ambassadors: collection({
      label: "Ambassadors",
      slugField: "title",
      path: "src/content/Community_Ambassadors/*/profile",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          //add ./ to the image path
          directory: "src/assets/images/blogs",

          // Use the @assets path alias
          publicPath: "@assets/images/blogs/",
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
              directory: "src/assets/images/blogs",

              // Use the @assets path alias
              publicPath: "/src/assets/images/blogs/",
            },
          },
        }),
      },
    }),
  },
});
