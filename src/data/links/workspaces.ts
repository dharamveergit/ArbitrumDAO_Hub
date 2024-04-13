export const wgNav = (slug: string) => {
  return [
    {
      title: "Home",

      slug: `/working-groups/${slug}`,
    },
    {
      title: "Meetings",

      slug: `/working-groups/${slug}/meetings`,
    },
    {
      title: "Projects",
      slug: `/working-groups/${slug}/projects`,
    },
    {
      title: "Contributions",
      slug: `/working-groups/${slug}/contributions`,
    },
  ];
};

export const brandandresources = [
  {
    title: "Brand Kit",
    slug: "/brandkit/",
  },
  {
    title: "Press",
    slug: "/press/",
  },
];
