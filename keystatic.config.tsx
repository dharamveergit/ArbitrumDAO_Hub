import { collection, config, fields } from "@keystatic/core";
import { Ambassadors } from "keystatic/Ambassadors";
import { Authors, Blogs } from "keystatic/Blogs";
import {
  Bounties,
  Collaboration,
  Events,
  EventsA,
  Jobs,
} from "keystatic/Community";
import {
  AmbassadorContributions,
  Contributions,
  WGContributions,
} from "keystatic/Contribution";
import { Updates } from "keystatic/GrantHub";
import { Projects, WorkingGroups } from "keystatic/WorkingGroups";

const REPO_OWNER = "ArbitrumHub";
const REPO_NAME = "ArbitrumDAO_Hub";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? {
          kind: "local",
        }
      : {
          kind: "github",
          repo: `${REPO_OWNER}/${REPO_NAME}`,
          branchPrefix: "contributions/",
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
        "contributions",
        "bounties",
        "jobs",
        "events",
        "collaboration",
      ],
      GrantHub: ["updates"],
      Ambassadors: ["ambassadors", "contributionsa", "gallery", "eventsa"],
      WorkingGroups: ["workingGroups", "Projects", "contributionsw"],
    },
  },

  collections: {
    author: Authors,
    posts: Blogs,

    ambassadors: Ambassadors,

    contributionsw: WGContributions,
    contributionsa: AmbassadorContributions,
    contributions: Contributions,
    bounties: Bounties,
    jobs: Jobs,
    events: Events,
    eventsa: EventsA,
    collaboration: Collaboration,

    workingGroups: WorkingGroups,
    Projects: Projects,

    updates: Updates,
    gallery: collection({
      label: "Gallery",
      slugField: "title",
      path: "src/content/Gallery/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images/gallery",
          publicPath: "@assets/images/gallery/",
        }),
        externalUrl: fields.url({ label: "External Url" }),
        type: fields.conditional(
          fields.select({
            label: "Type",
            description:
              "Select the type of the featured media for the contribution.",
            options: [{ label: "Ambassadors", value: "ambassadors" }],
            defaultValue: "ambassadors",
          }),

          {
            ambassadors: fields.relationship({
              label: "Ambassador",
              description: "Select the ambassador for the contribution.",
              collection: "ambassadors",
            }),
          },
        ),
      },
    }),
  },
});
