import { collection, fields } from "@keystatic/core";

const values = (type: "community" | "ambassadors" | "wg" = "community") => {
  return collection({
    label: "Contributions",
    slugField: "title",
    entryLayout: "content",
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
      externalUrl: fields.url({ label: "External Url" }),
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
          defaultValue: type,
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
  });
};

export const Contributions = values("community");
export const AmbassadorContributions = values("ambassadors");
export const WGContributions = values("wg");
