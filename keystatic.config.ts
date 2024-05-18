import { ambassadors } from "@/data/schema/community";
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
    kind: "local",
    // repo: `${REPO_OWNER}/${REPO_NAME}`,
  },
  ui: {
    brand: {
      name: "Arbitrum DAO Hub",
    },
    navigation: {
      Blogs: ["author", "posts"],
      Community: [
        "ambassadors",
        "contributions",
        "bounties",
        "jobs",
        "events",
        "workingGroups",
        "collaboration",
      ],
    },
  },

  collections: {
    author: collection({
      label: "Authors",
      slugField: "name",
      format: { data: "json" },
      path: "src/content/authors/*",

      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
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

        author: fields.relationship({
          label: "Author",
          description: "Select the author of the blog",
          collection: "author",
        }),

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
      path: "src/content/Community_Ambassadors/*/",
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

    contributions: collection({
      label: "Contributions",
      slugField: "title",
      path: "src/content/Community_Contributions/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images/blogs",
          publicPath: "@assets/images/blogs/",
        }),

        label: fields.text({ label: "Label" }),
        externalUrl: fields.text({ label: "External Url" }),
        tag: fields.select({
          label: "Tag",
          options: [
            { value: "articles", label: "Articles" },
            { value: "general", label: "General" },
            { value: "guides", label: "Guides" },
            { value: "videos", label: "Videos" },
          ],
          defaultValue: "general",
        }),
        // Featured media
        type: fields.conditional(
          // First, define a `select` field with all the available "conditions"
          fields.select({
            label: "Type",
            description:
              "Select the type of the featured media for the contribution.",
            options: [
              { label: "Community", value: "community" },
              { label: "Ambassadors", value: "ambassadors" },
              { label: "Working Group", value: "wg" },
            ],
            defaultValue: "community",
          }),

          {
            community: fields.empty(),

            ambassadors: fields.relationship({
              label: "Ambassador",
              description: "Select the ambassador for the contribution.",
              collection: "ambassadors",
            }),

            wg: fields.relationship({
              label: "Working Group",
              description: "Select the working group for the contribution.",
              collection: "workingGroups",
            }),
          },
        ),

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
    collaboration: collection({
      label: "Collaboration",
      slugField: "title",
      path: "src/content/Community_Contributions/*/",
      format: { contentField: "content" },
      //

      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        subTitle: fields.text({ label: "Sub Title" }),
        date: fields.date({ label: "Date" }),

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

    workingGroups: collection({
      label: "Working Groups",
      slugField: "title",
      path: "src/content/Working_Groups/*/",
      format: { contentField: "content" },
      //

      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        overview: fields.text({ label: "Overview", multiline: true }),
        type: fields.text({ label: "Type", defaultValue: "wg" }),
        tag: fields.text({ label: "Tag" }),
        meetingOn: fields.text({ label: "Meeting On" }),
        meetingLink: fields.text({ label: "Meeting Link" }),
        meetingTiming: fields.text({ label: "Meeting Timing" }),
        calendarId: fields.text({ label: "Calendar Id" }),
        buttons: fields.array(
          fields.object({
            text: fields.text({ label: "Text" }),
            type: fields.select({
              label: "Type",
              options: [
                { value: "primary", label: "Primary" },
                { value: "secondary", label: "Secondary" },
              ],
              defaultValue: "primary",
              description: "Select the type of the button",
            }),
            link: fields.text({ label: "Link" }),
            icon: fields.select({
              label: "Icon",
              options: [
                { value: "socials/twitter", label: "Twitter" },
                { value: "socials/telegram", label: "Telegram" },
              ],
              description: "Select the icon for the button",
              defaultValue: "socials/twitter",
            }),
          }),
          {
            label: "Buttons",
            slugField: "text",
            itemLabel: (props) => props.fields.text.value,
          },
        ),

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
