const projects = ["grant-program", "uniswap"];

export const fundedGrants = (pathname: string, slug: string) => {
  return [
    {
      slug: `/grant-hub/${slug}/`,
      title:
        slug?.charAt(0)?.toUpperCase() + slug?.slice(1)?.replace(/-/g, " "),
      match: pathname === `/grant-hub/${slug}/`,
    },
    {
      slug: `/grant-hub/${slug}/grants/`,
      title: projects.includes(slug) ? "Accepted Projects" : "Grant Programs",
      match: pathname === `/grant-hub/${slug}/grants/`,
    },
    {
      slug: `/grant-hub/${slug}/updates/`,
      title: "Updates",
      match: pathname === `/grant-hub/${slug}/updates/`,
    },
  ];
};
export const incentiveGrants = (pathname: string, slug: string) => {
  return [
    {
      slug: `/incentive-programs/${slug}/`,
      title: "Home",
      match: pathname === `/incentive-programs/${slug}/`,
    },
    {
      slug: `/incentive-programs/${slug}/projects/`,
      title: "Accepted Projects",
      match: pathname === `/incentive-programs/${slug}/projects/`,
    },
    {
      slug: `/incentive-programs/${slug}/updates/`,
      title: "Updates",
      match: pathname === `/incentive-programs/${slug}/updates/`,
    },
  ];
};
export const projectsHome = (
  pathname: string,
  slug: string,
  data: string,
  projects: boolean,
) => {
  const home = [
    {
      slug: `/grant-hub/${slug?.split("/")?.[0]}/grants/${data}/`,
      title:
        data?.charAt(0)?.toUpperCase() + data?.slice(1)?.replace(/-/g, " "),
      match: pathname === `/grant-hub/${slug?.split("/")?.[0]}/grants/${data}/`,
    },
  ];
  return projects
    ? [
        ...home,
        {
          slug: `/grant-hub/${slug?.split("/")?.[0]}/grants/${data}/projects/`,
          title: "Projects",
          match:
            pathname ===
            `/grant-hub/${slug?.split("/")?.[0]}/grants/${data}/projects/`,
        },
      ]
    : home;
};
export const uniswapNav = (pathname: string) => {
  return [
    {
      slug: "/grant-hub/uniswap/",
      title: "Home",
      match: pathname === "/grant-hub/uniswap/",
    },
    {
      slug: "/grant-hub/uniswap/grants/",
      title: "Grants",
      match: pathname === "/grant-hub/uniswap/grants/",
    },
    {
      slug: "/grant-hub/uniswap/update/",
      title: "Update",
      match: pathname === "/grant-hub/uniswap/update/",
    },
  ];
};

export const incentiveProgram = (pathname: string) => {
  return [
    {
      slug: "/incentive-programs/",
      title: "Home",
      match: pathname === "/incentive-programs/",
    },
    {
      slug: "/incentive-programs/short-term-incentive-program/",
      title: "STIP",
      match: pathname === "/incentive-programs/short-term-incentive-program/",
    },
    {
      slug: "/incentive-programs/long-term-incentive-pilot-program/",
      title: "LTIPP",
      match:
        pathname === "/incentive-programs/long-term-incentive-pilot-program/",
    },
    {
      slug: "/incentive-programs/important-discussions/",
      title: "Discussions",
      match: pathname === "/incentive-programs/important-discussions/",
    },
  ];
};
