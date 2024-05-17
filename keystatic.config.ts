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
    kind: "github",
    repo: `${REPO_OWNER}/${REPO_NAME}`,
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
          //add ./ to the image path
          directory: "src/assets/images/blogs",

          // Use the @assets path alias
          publicPath: "@assets/images/blogs/",
        }),

        label: fields.text({ label: "Label" }),
        externalUrl: fields.text({ label: "External Url" }),
        tag: fields.text({ label: "Tag" }),
        isAmbassador: fields.conditional(
          fields.checkbox({ label: "Is Ambassador", defaultValue: false }),

          {
            true: fields.relationship({
              label: "Ambassadors",
              description: "Select the ambassadors for the contribution",
              collection: "ambassadors",
            }),

            false: fields.empty(),
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
    //     title: Arbitrum Treasury and Sustainability - Working Group

    // description: The Treasury and Sustainability Working Group was formed to address critical challenges facing the Arbitrum ecosystem, particularly in treasury management and sustainability. Its primary roles include researching best practices for managing price impact from large liquidations, optimizing treasury diversification, utilizing sequencer fees effectively, and converting grants into strategic investments. Additionally, the group evaluates various practices, tools, and service providers to determine integration suitability.

    // overview: The Treasury and Sustainability Working Group tackles vital issues like managing liquidations, optimizing treasury diversification, and evaluating integration options.

    // type: "wg"
    // tag: "Established"
    // meetingOn: "Thursday at 3 pm UTC"
    // meetingLink: "#"
    // meetingTiming: "3 pm UTC"
    // calendarId: "1ed9e6c0a914d3bf87aed85cbc041cfa3ef33a383e425d88cd3fec67e1057ef6@group.calendar.google.com"
    // buttons:
    //   - text: "Learn More"
    //     type: "secondary"
    //     link: "https://forum.arbitrum.foundation/t/arbitrum-treasury-and-sustainability-working-group/18978/9"
    //   - text: "Twitter"
    //     type: "secondary"
    //     link: "https://twitter.com/arbtreasury"
    //     icon: "socials/twitter"
    //   - text: "Telegram"
    //     link: "https://t.me/+DQn51hWOIUg0NTQx"
    //     type: "secondary"
    //     icon: "socials/telegram"
    workingGroups: collection({
      label: "Working Groups",
      slugField: "title",
      path: "src/content/Community_Contributions/*/",
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
