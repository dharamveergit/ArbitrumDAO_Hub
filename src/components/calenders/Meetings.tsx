import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { CollectionEntry } from "astro:content";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { Switch } from "../ui/switch";

interface Meeting {
  summary: string;
  start: {
    dateTime: string;
  };
  slug: string;
  htmlLink: string;
  id: string;
  items: any;
}

const queryClient = new QueryClient();
const Meetings = ({
  meetings,
  type,
  calendarId,
}: {
  meetings: Array<CollectionEntry<"Community_Meetings">> | Array<any>;
  type?: string;
  calendarId?: string;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCalendar meetings={meetings} type={type} calendarId={calendarId} />
    </QueryClientProvider>
  );
};

export default Meetings;

// merge:{
//   "17/11/2023" :[]
// }
const mergeSameDates = (arr: any) => {
  const merged: any = {};
  arr?.forEach((event: any) => {
    const date = new Date(event.start.dateTime).toLocaleDateString("en-US", {
      weekday: "short",

      day: "numeric",
      month: "short",
    });
    if (merged[date]) {
      merged[date].push(event);
    } else {
      merged[date] = [event];
    }
  });
  return merged;
};

const CustomCalendar = ({
  meetings,
  type,
  calendarId,
}: {
  meetings: Array<CollectionEntry<"Community_Meetings">> | Array<any>;
  type?: string;
  calendarId?: string;
}) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState<Date | null>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [events, setEvents] = React.useState<Record<
    string,
    Array<Meeting>
  > | null>(null);
  const [eventsByMonth, setEventsByMonth] = React.useState<Record<
    string,
    Array<Meeting>
  > | null>(null);
  const [booked, setBooked] = React.useState<Date[]>([]);

  const [recourses, setRecourses] = React.useState<boolean>(false);
  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["events", type],
    queryFn: async () => {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=AIzaSyAxCoI_edYVZ1xA9qCclqHv-Ji19J08c5Q`,
      );
      const data = await response.json();

      // if (type) {
      //   const items = data?.items?.filter((event: any) => {
      //     return event.summary?.toLowerCase().includes(type.toLowerCase());
      //   });
      //   return {
      //     ...data,
      //     items,
      //   };
      // }

      return data;
    },
  });
  // console.log(res);

  React.useEffect(() => {
    if (data?.items) {
      setBooked(
        data?.items?.map((date: any) => {
          return new Date(date.start.dateTime);
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (date) {
      if (recourses) {
        setEvents(
          mergeSameDates(
            meetings
              ?.filter((event) => {
                const eventDate = event?.data?.date;
                return (
                  eventDate?.getFullYear() === date.getFullYear() &&
                  eventDate?.getMonth() === date.getMonth() &&
                  eventDate?.getDate() === date.getDate()
                );
              })
              .map((event) => {
                return {
                  summary: event.data.title,
                  start: {
                    dateTime: event?.data.date.toISOString(),
                  },
                  slug: event.slug,
                };
              }),
          ),
        );
      } else {
        setEvents(
          mergeSameDates(
            data?.items?.filter((event: any) => {
              const eventDate = new Date(event.start.dateTime);
              return (
                eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate()
              );
            }),
          ),
        );
      }
    }
  }, [date, data, recourses]);

  useEffect(() => {
    if (month) {
      if (recourses) {
        const e = meetings?.filter((event) => {
          const eventDate = event?.data?.date;
          return (
            eventDate?.getFullYear() === month.getFullYear() &&
            eventDate?.getMonth() === month.getMonth()
          );
        });

        const sorted = e?.sort((a, b) => {
          return (
            new Date(a?.data?.date).getTime() -
            new Date(b?.data?.date).getTime()
          );
        });

        setEventsByMonth(
          mergeSameDates(
            sorted?.map((event) => {
              return {
                summary: event?.data?.title,
                start: {
                  dateTime: event?.data?.date.toISOString(),
                },
                slug: event.slug,
              };
            }),
          ),
        );
      } else {
        const e = data?.items?.filter((event: any) => {
          const eventDate = new Date(event.start.dateTime);
          return (
            eventDate.getFullYear() === month.getFullYear() &&
            eventDate.getMonth() === month.getMonth()
          );
        });

        const sorted = e?.sort((a: any, b: any) => {
          return (
            new Date(a.start.dateTime).getTime() -
            new Date(b.start.dateTime).getTime()
          );
        });

        setEventsByMonth(mergeSameDates(sorted));
      }
    }
  }, [month, data, recourses]);

  console.log(recourses);

  return (
    <div className="flex flex-col  overflow-hidden rounded-small border-4 border-zinc-200  md:flex-row md:rounded-3xl lg:rounded-5xl">
      <div className="border-b md:border-b-0  md:border-r">
        <Calendar
          modifiers={{ booked: booked }}
          modifiersClassNames={{
            booked:
              "relative border after:content-[attr(data-content)] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:opacity-100 after:z-10",
          }}
          onDayClick={(day) => {
            console.log(day);
            if (
              date &&
              day.getFullYear() === date.getFullYear() &&
              day.getMonth() === date.getMonth() &&
              day.getDate() === date.getDate()
            ) {
              setDate(null);
              //this day month
              setMonth(new Date(day.getFullYear(), day.getMonth(), 1));
            } else {
              setDate(day);
              setMonth(null);
            }
          }}
          selected={date ?? undefined}
          onMonthChange={(month) => {
            setMonth(month);
            setDate(null);
          }}
        />
      </div>
      <div className=" w-full   md:pt-6">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 pb-4 pt-4 md:pt-0">
          <h1 className="  text-center text-sm font-medium ">
            {month
              ? month.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })
              : date
                ? date.toLocaleString("default", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Select a date"}
          </h1>
          <div className="flex items-center gap-2">
            <label
              htmlFor="recourses"
              className="font-os text-sm text-zinc-300"
            >
              Resources
            </label>
            <Switch
              id="recourses"
              checked={recourses}
              onCheckedChange={(checked) => setRecourses(checked)}
            />
          </div>
        </div>
        <div className="custom-scrollbar flex flex-col gap-4 overflow-y-auto pb-5 pt-4 md:max-h-[20.5rem] md:pb-0">
          {isLoading || isFetching ? (
            <Loading />
          ) : (
            <>
              {eventsByMonth &&
                month &&
                Object?.keys(eventsByMonth).length === 0 && (
                  <p className=" text-center text-sm font-medium">
                    No events found for this month
                  </p>
                )}

              {date && events && Object?.keys(events).length === 0 && (
                <p className=" text-center text-sm font-medium">
                  No events found for this day
                </p>
              )}
              {month && eventsByMonth
                ? Object?.keys(eventsByMonth)?.map((date, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 border-b px-5 pb-5"
                    >
                      <h1 className="text-sm font-medium">{date}</h1>
                      {eventsByMonth[date]?.map((event, index) => (
                        <Event
                          event={event}
                          recourses={recourses}
                          key={index}
                          type={type}
                        />
                      ))}
                    </div>
                  ))
                : date && events
                  ? Object?.keys(events)?.map((date, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-4 border-b px-5 pb-5"
                      >
                        <h1 className="text-sm font-medium">{date}</h1>
                        {events[date]?.map((event, index) => (
                          <Event
                            event={event}
                            recourses={recourses}
                            key={index}
                            type={type}
                          />
                        ))}
                      </div>
                    ))
                  : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Event = ({
  event,
  recourses,
  type,
}: {
  event: Meeting;
  recourses: boolean;
  type?: string;
}) => {
  return (
    <div key={event.id} className="flex items-center justify-between px-2 ">
      <div className="flex  gap-8">
        <span className=" w-20 text-xs font-medium text-zinc-500 md:text-sm">
          {new Date(event.start.dateTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          })}{" "}
          PST
        </span>
        <a
          href={
            recourses
              ? type
                ? `/working-groups/${event?.slug}/#sub`
                : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
              : event?.htmlLink
          }
        >
          <h2 className="text-xs font-medium text-primary hover:underline md:text-sm">
            {event.summary}
          </h2>
        </a>
      </div>
      {recourses && (
        <a
          href={
            type
              ? `/working-groups/${event?.slug}/#sub`
              : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
          }
          className="flex items-center gap-1 font-os text-xs  text-zinc-500"
        >
          Resources
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div role="status" className="w-full animate-pulse px-5 ">
      <div className="mb-2 h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="mb-4 h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="my-4 h-px w-full rounded bg-zinc-200 dark:bg-zinc-700"></div>

      <div className="mb-2 h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="mb-4 h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="my-4 h-px w-full rounded bg-zinc-200 dark:bg-zinc-700"></div>

      <div className="mb-2 h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="mb-4 h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="my-4 h-px w-full rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="mb-2 h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="mb-4 h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700"></div>
      <div className="my-4 h-px w-full rounded bg-zinc-200 dark:bg-zinc-700"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
