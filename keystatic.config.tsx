import { collection, config, fields } from "@keystatic/core";

const REPO_OWNER = "ArbitrumHub";
const REPO_NAME = "ArbitrumDAO_Hub";
const storage =
  process.env.NODE_ENV === "development"
    ? {
        kind: "local",
      }
    : {
        kind: "github",
        repo: `${REPO_OWNER}/${REPO_NAME}`,
      };
export default config({
  storage: {
    kind: "github",
    repo: `${REPO_OWNER}/${REPO_NAME}`,
  },
  ui: {
    brand: {
      name: "Arbitrum DAO Hub",
      mark(props) {
        return <img src="/favicon.svg" alt="Arbitrum DAO Hub" height={24} />;
      },
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
        "Projects",
      ],
      GrantHub: ["updates"],
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
          directory: "src/assets/images/contributions",
          publicPath: "@assets/images/contributions/",
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

        type: fields.conditional(
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
            community: fields.select({
              label: "By",
              description: "",
              options: [{ label: "Community", value: "contributions" }],
              defaultValue: "contributions",
            }),

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
              directory: "src/assets/images/contributions",
              publicPath: "/src/assets/images/contributions/",
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
              directory: "src/assets/images/bounties",

              // Use the @assets path alias
              publicPath: "/src/assets/images/bounties/",
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
          directory: "src/assets/images/events",

          // Use the @assets path alias
          publicPath: "@assets/images/events/",
        }),
        date: fields.date({ label: "Date" }),
        endDate: fields.date({ label: "End Date" }),
        externalUrl: fields.text({ label: "External Url" }),
        type: fields.select({
          label: "Type",
          options: [
            { value: "event", label: "Event" },
            { value: "hackathon", label: "Hackathon" },
          ],
          defaultValue: "event",
        }),
        eventBy: fields.conditional(
          fields.select({
            label: "Event By",
            description:
              "Select the type of the featured media for the contribution.",
            options: [
              { label: "Community", value: "community" },
              { label: "Ambassadors", value: "ambassadors" },
            ],
            defaultValue: "community",
          }),

          {
            community: fields.select({
              label: "By",
              description: "",
              options: [{ label: "Community", value: "community" }],
              defaultValue: "community",
            }),

            ambassadors: fields.relationship({
              label: "Ambassador",
              description: "Select the ambassador for the contribution.",
              collection: "ambassadors",
            }),
          },
        ),
        content: fields.markdoc({
          label: "Content",
          extension: "md",

          options: {
            image: {
              directory: "src/assets/images/events",

              // Use the @assets path alias
              publicPath: "/src/assets/images/events/",
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
              directory: "src/assets/images/collaboration",

              // Use the @assets path alias
              publicPath: "/src/assets/images/collaboration/",
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
              directory: "src/assets/images/workingGroups",

              // Use the @assets path alias
              publicPath: "/src/assets/images/workingGroups/",
            },
          },
        }),
      },
    }),
    Projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/Projects/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        tag: fields.text({ label: "Tag" }),
        status: fields.select({
          label: "Status",
          options: [
            { value: "ongoing", label: "Ongoing" },
            { value: "completed", label: "Completed" },
          ],
          defaultValue: "ongoing",
        }),

        type: fields.conditional(
          fields.select({
            label: "Type",
            description:
              "Select the type of the featured media for the contribution.",
            options: [{ label: "Working Group", value: "wg" }],
            defaultValue: "wg",
          }),

          {
            wg: fields.relationship({
              label: "Working Group",
              description: "Select the working group for the contribution.",
              collection: "workingGroups",
            }),
          },
        ),
        externalUrl: fields.text({ label: "External Url" }),
        content: fields.markdoc({
          label: "Content",
          extension: "md",
          options: {
            image: {
              directory: "src/assets/images/Projects",
              publicPath: "/src/assets/images/Projects/",
            },
          },
        }),
      },
    }),

    updates: collection({
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
    }),
  },
});
