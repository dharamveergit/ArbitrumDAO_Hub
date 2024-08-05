import { collection, fields } from "@keystatic/core";
export const Events = collection({
  label: "Events",
  slugField: "title",
  path: "src/content/Community_Events/*/",
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
      directory: "src/assets/images/events",
      validation: { isRequired: true },

      // Use the @assets path alias
      publicPath: "@assets/images/events/",
    }),
    date: fields.date({ label: "Date", validation: { isRequired: true } }),
    endDate: fields.date({
      label: "End Date",
      validation: { isRequired: true },
    }),
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
});
export const EventsA = collection({
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
        defaultValue: "ambassadors",
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
});

export const Collaboration = collection({
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
});

export const Jobs = collection({
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
});

export const Bounties = collection({
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
});
