import { collection, fields } from "@keystatic/core";

export const Blogs = collection({
  label: "Blogs",
  slugField: "title",
  path: "src/content/blogs/*/",
  entryLayout: "content",
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
