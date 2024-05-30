import { collection, fields } from "@keystatic/core";

export const WorkingGroups = collection({
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
});

export const Projects = collection({
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
});
