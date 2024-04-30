import React, { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { CollectionEntry } from "astro:content";
import { ArrowUpRight } from "lucide-react";
import { DatePickerWithRange } from "./DateRangePicker";

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
  const [date, setDate] = useState<Date | null>(null);

  const [month, setMonth] = useState<Date | null>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [events, setEvents] = useState<Record<string, Array<Meeting>> | null>(
    null,
  );

  const [eventsByMonth, setEventsByMonth] = useState<Record<
    string,
    Array<Meeting>
  > | null>(null);

  const [booked, setBooked] = useState<Date[]>([]);

  const [recourses, setRecourses] = useState<boolean>(true);

  // console.log(res);

  useEffect(() => {
    if (date) {
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
    }
  }, [date]);

  useEffect(() => {
    if (month) {
      const e = meetings?.filter((event) => {
        const eventDate = event?.data?.date;
        return (
          eventDate?.getFullYear() === month.getFullYear() &&
          eventDate?.getMonth() === month.getMonth()
        );
      });

      const sorted = e?.sort((a, b) => {
        return (
          new Date(a?.data?.date).getTime() - new Date(b?.data?.date).getTime()
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
    }
  }, [month]);

  console.log(recourses);

  return (
    <div className="flex flex-col  overflow-hidden rounded-small border-4 border-zinc-200  md:flex-row md:rounded-3xl lg:rounded-5xl">
      <div className=" w-full   pt-6">
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
          <DatePickerWithRange />
        </div>
        <div className="custom-scrollbar flex flex-col gap-4 overflow-y-auto pb-5 pt-4 md:max-h-[20.5rem] md:pb-0">
          <>
            {eventsByMonth &&
              month &&
              Object?.keys(eventsByMonth).length === 0 && (
                <p className=" pb-5 text-center text-sm font-medium">
                  No events found for this month
                </p>
              )}

            {date && events && Object?.keys(events).length === 0 && (
              <p className=" text-center text-sm font-medium">
                No events found for this day
              </p>
            )}
            <div className="grid grid-cols-5 gap-2 border-b px-5 pb-4">
              {["Meeting", "Time", "Notes", "Transcript", "Recording"]?.map(
                (item, index) => (
                  <h2
                    key={index}
                    className="text-xs font-medium text-zinc-500 md:text-sm"
                  >
                    {item}
                  </h2>
                ),
              )}
            </div>
            {eventsByMonth &&
              Object?.keys(eventsByMonth)?.map((date, i) => (
                <div key={i} className="flex flex-col gap-4 border-b px-5 pb-5">
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
              ))}
          </>
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
    <div key={event.id} className="grid grid-cols-5 gap-2">
      <h1 className="font-medium">{event.summary}</h1>
      <p className="font-os text-xs text-zinc-400">
        {new Date(event.start.dateTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}{" "}
        PST
      </p>
      <a
        href={
          type
            ? `/working-groups/${event?.slug}/#sub`
            : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
        }
        className="flex gap-1 font-os text-xs  "
      >
        Notes
        <ArrowUpRight size={16} />
      </a>
      <a
        href={
          type
            ? `/working-groups/${event?.slug}/#sub`
            : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
        }
        className="flex gap-1 font-os text-xs  "
      >
        Transcript
        <ArrowUpRight size={16} />
      </a>
      <a
        href={
          type
            ? `/working-groups/${event?.slug}/#sub`
            : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
        }
        className="flex gap-1 font-os text-xs  "
      >
        View Recording
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
};
