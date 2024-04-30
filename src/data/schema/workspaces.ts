import { defineCollection, z } from "astro:content";

export const wg = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        tag: z.string().optional(),
        date: z.date().optional(),
        type: z.union([
          z.literal("wg"),
          z.literal("project"),
          z.literal("transcript"),
          z.literal("notes"),
          z.literal("contribution"),
        ]),
        meetingOn: z.string().optional(),
        meetingLink: z.string().optional(),
        meetingTiming: z.string().optional(),
        recordingUrl: z.string().optional(),
        description: z.string().optional(),
        overview: z.string().optional(),
        buttons: z
          .array(
            z.object({
              text: z.string(),
              link: z.string(),
              type: z
                .union([z.literal("default"), z.literal("secondary")])
                .optional(),
              icon: z.string().optional(),
            }),
          )
          .optional(),
        image: image().optional(),
        externalUrl: z.string().optional(),
        calendarId: z.string().optional(),
        status: z
          .union([z.literal("ongoing"), z.literal("complete")])
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.type === "wg") {
          if (!data.tag) {
            ctx.addIssue({
              code: "custom",
              message: "Working group must have a tag",
            });
          }
          if (!data.calendarId) {
            ctx.addIssue({
              code: "custom",
              message: "Working group must have a calenderId",
            });
          }
          if (!data.description) {
            ctx.addIssue({
              code: "custom",
              message: "Working group must have a description",
            });
          }
        }
        if (data.type === "project") {
          if (!data.tag) {
            ctx.addIssue({
              code: "custom",
              message: "Project must have a tag",
            });
          }
          if (!data.description) {
            ctx.addIssue({
              code: "custom",
              message: "Project must have a description",
            });
          }
          if (!data.status) {
            ctx.addIssue({
              code: "custom",
              message: "Project must have a status",
            });
          }
        }
        if (data.type === "notes" || data.type === "transcript") {
          if (!data.date) {
            ctx.addIssue({
              code: "custom",
              message: "Notes and transcript must have a date",
            });
          }
        }
      }),
});
