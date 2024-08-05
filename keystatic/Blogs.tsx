import { collection, fields } from "@keystatic/core";

export const Blogs = collection({
  label: "Blogs",
  slugField: "title",
  path: "src/content/blogs/*/",
  entryLayout: "content",
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
      directory: "src/assets/images/blogs",

      // Use the @assets path alias
      publicPath: "@assets/images/blogs/",
      validation: { isRequired: true },
    }),
    tag: fields.text({ label: "Tag" }),
    label: fields.text({ label: "Label" }),
    pubDate: fields.date({
      label: "Publication Date",
      validation: { isRequired: true },
    }),

    author: fields.relationship({
      label: "Author",
      description: "Select the author of the blog",
      collection: "author",
      validation: { isRequired: true },
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
});

export const Authors = collection({
  label: "Authors",
  slugField: "name",
  format: { data: "json" },
  path: "src/content/authors/*",

  schema: {
    name: fields.slug({ name: { label: "Name" } }),
    description: fields.text({ label: "Description", multiline: true }),
  },
});
