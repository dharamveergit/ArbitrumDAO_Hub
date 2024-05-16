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
              publicPath: "/src/assets/images/blogs/",
            },
          },
        }),
      },
    }),

    bounties: collection({
      label: "Bounties",
      slugField: "title",
      path: "src/content/Community_Bounties/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        date: fields.date({ label: "Date" }),
        reward: fields.number({ label: "Reward" }),
        link: fields.text({ label: "Link" }),
        level: fields.select({
          label: "Level",
          description: "Select the level of the bounty",
          options: [
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ],
          defaultValue: "beginner",
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

    jobs: collection({
      label: "Jobs",
      slugField: "title",
      path: "src/content/Community_Jobs/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        subTitle: fields.text({ label: "Sub Title" }),
        link: fields.text({ label: "Link" }),
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

    events: collection({
      label: "Events",
      slugField: "title",
      path: "src/content/Community_Events/*/",
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
        date: fields.date({ label: "Date" }),
        endDate: fields.date({ label: "End Date" }),
        externalUrl: fields.text({ label: "External Url" }),

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
