import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CollectionEntry, DataCollectionKey } from "astro:content";
import classNames from "classnames";
import Button from "../ui/button";
import { ArrowUpCircle } from "lucide-react";
import BlogCard from "../ui/cards/blog-card";
import Gallery from "../swipers/Gallery";

const AmbassadorsTabs = ({
  contributions,
  achievements,
  events,
  gallery,
}: {
  contributions: Array<CollectionEntry<"Community_Ambassadors">>;
  achievements: Array<CollectionEntry<"Community_Ambassadors">["data"]>;
  events: Array<CollectionEntry<"Community_Ambassadors">["data"]>;
  gallery: any;
}) => {
  const links = ["Contributions", "Achievements", "Events", "Gallery"];

  const heading = "text-xl font-medium md:text-2xl lg:text-4xl";
  const description =
    "font-os text-xs font-light text-gray-500 md:text-base lg:text-xl";

  return (
    <Tabs defaultValue={links[0]} className="flex flex-col gap-4 py-10">
      <TabsList className=" flex h-auto justify-start gap-2 overflow-x-auto bg-white">
        {links.map((product) => {
          return (
            <TabsTrigger
              key={product}
              value={product}
              className="min-w-[11rem] flex-1 justify-start rounded-full bg-primary-light px-5 py-2.5 text-left font-os text-xs font-normal data-[state=active]:bg-secondary data-[state=active]:text-white md:min-w-fit md:py-2.5 md:text-sm lg:py-3 "
            >
              {product}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {links.map((product) => {
        return (
          <TabsContent key={product} value={product}>
            {product === "Contributions" ? (
              <Contributions contributions={contributions} />
            ) : product === "Achievements" ? (
              <Achievements achievements={achievements} />
            ) : product === "Events" ? (
              <Events contributions={events} />
            ) : (
              <Gallery gallery={gallery} />
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default AmbassadorsTabs;

const Contributions = ({
  contributions,
}: {
  contributions: Array<CollectionEntry<"Community_Ambassadors">>;
}) => {
  return (
    <div className="grid gap-6 rounded-large  md:grid-cols-2 lg:grid-cols-3">
      {contributions?.map(({ data, slug }) => (
        <BlogCard
          blog={data}
          type="blog"
          key={data.title}
          link={`/community-hub/ambassadors/near-you/${slug}`}
        />
      ))}
    </div>
  );
};
const Events = ({
  contributions,
}: {
  contributions: Array<CollectionEntry<"Community_Ambassadors">["data"]>;
}) => {
  return (
    <div className="grid gap-6 rounded-large md:grid-cols-2 lg:grid-cols-3">
      {contributions?.map((data) => (
        <BlogCard blog={data} type="event" key={data.title} />
      ))}
    </div>
  );
};

const Achievements = ({
  achievements,
}: {
  achievements: Array<CollectionEntry<"Community_Ambassadors">["data"]>;
}) => {
  return (
    <div className="flex flex-col gap-5 rounded-small border-[5px] border-zinc-200 bg-zinc-50 p-2 md:rounded-5xl lg:p-5">
      <ul className="flex flex-col gap-4">
        {achievements.map((data, i) => (
          <li
            key={i}
            className={classNames(
              "flex flex-col gap-3 rounded-xl border bg-white p-4 md:rounded-2xl lg:rounded-xl",
            )}
          >
            <div className="flex gap-5 md:items-center  ">
              <img
                src={"/temp3.png"}
                alt={data.title}
                className="size-16 md:size-28"
              />
              <div className="flex flex-col gap-1.5 md:gap-2.5">
                <p className="font-os text-xs text-zinc-500 lg:text-sm">
                  {data?.label}
                </p>
                <h1 className="text-lg font-medium text-zinc-600 md:text-xl lg:text-2xl">
                  {data?.title}
                </h1>
                <p className="hidden font-os text-xs text-zinc-500 md:block md:text-base">
                  {data?.description}
                </p>
              </div>
            </div>
            <p className=" font-os text-sm text-zinc-500 md:hidden md:text-base">
              {data?.description}
            </p>
            <div className="flex justify-end">
              <Button
                variant={"secondary"}
                // href={`/community-hub/collaborations/${slug}`}
              >
                Read More
                <ArrowUpCircle className="ml-2 h-4 w-4 rotate-45 stroke-[1] text-zinc-500 " />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
