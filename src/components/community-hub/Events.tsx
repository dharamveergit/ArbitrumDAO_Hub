import { buttonVariants } from "@/lib/cvas";
import type { CollectionEntry } from "astro:content";
import React from "react";
import BlogCard from "../ui/cards/blog-card";

const Events = ({
  sortedEvents,
  children,
  tag,
}: {
  sortedEvents: Array<CollectionEntry<"Community_Events">>;
  children: React.ReactNode;
  tag: string;
}) => {
  const [upcoming, setUpcoming] = React.useState(true);
  const [events, setEvents] =
    React.useState<Array<CollectionEntry<"Community_Events">>>(sortedEvents);

  React.useEffect(() => {
    setEvents(
      sortedEvents.filter(({ data }) => new Date(data.date ?? "") > new Date()),
    );
  }, [sortedEvents]);
  return (
    <section className="flex flex-col gap-4 py-5 lg:py-10" id="sub">
      <div className="flex items-center justify-between">
        {children}
        <div className="flex gap-2">
          <button
            className={buttonVariants({
              variant: !upcoming ? "default" : "secondary",
              size: "default",
            })}
            onClick={() => {
              setUpcoming(!upcoming);
              setEvents(sortedEvents);
            }}
          >
            All
          </button>
          <button
            className={buttonVariants({
              variant: upcoming ? "default" : "secondary",
              size: "default",
            })}
            onClick={() => {
              setUpcoming(!upcoming);
              setEvents(
                sortedEvents.filter(
                  ({ data }) => new Date(data.date ?? "") > new Date(),
                ),
              );
            }}
          >
            Upcoming
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {events?.map(({ data, slug }) => {
          return (
            <BlogCard
              key={data.title}
              type="event"
              blog={data}
              link={`/community-hub/initiatives/${slug}`}
              defaultImage={
                tag === "hackathon"
                  ? {
                      src: "/default/hackathons.png",
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      {events.length === 0 && (
        <div className=" w-full text-center ">No events found</div>
      )}
    </section>
  );
};

export default Events;
