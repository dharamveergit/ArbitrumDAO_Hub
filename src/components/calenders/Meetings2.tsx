import React, { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { CollectionEntry } from "astro:content";
import { ArrowUpRight } from "lucide-react";
import { DatePickerWithRange } from "./DateRangePicker";
import classNames from "classnames";
import type { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import clsx from "clsx";

interface Meeting {
  summary: string;
  start: {
    dateTime: string;
  };
  slug: string;
  htmlLink: string;
  id: string;
  items: any;
  recordingUrl: string;
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
  const currentDate = new Date();
  const [recourses, setRecourses] = useState<boolean>(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  // console.log(res);

  useEffect(() => {
    if (date) {
      setEvents(
        mergeSameDates(
          meetings
            ?.filter((event) => {
              const eventDate = event?.data?.date;
              return (
                date.from &&
                date?.to &&
                eventDate >= date?.from &&
                eventDate <= date?.to
              );
            })
            .map((event) => {
              return {
                summary: event.data.title,
                start: {
                  dateTime: event?.data.date.toISOString(),
                },
                recordingUrl: event?.data?.recordingUrl,
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
          date?.from &&
          date?.to &&
          eventDate >= date?.from &&
          eventDate <= date?.to
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
              recordingUrl: event?.data?.recordingUrl,
            };
          }),
        ),
      );
    }
  }, [month, date]);

  console.log(recourses);

  return (
    <div className="flex flex-col  overflow-hidden rounded-small border-4 border-zinc-200  md:flex-row md:rounded-3xl lg:rounded-5xl">
      <div className=" w-full   md:pt-6">
        <div className="sticky top-0 flex flex-col items-center justify-between gap-5 border-b bg-white px-5 pb-4 pt-4 md:flex-row md:pt-0">
          <h1 className="  hidden text-center text-sm font-medium md:block ">
            Showing events for{" "}
            {date?.from?.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}{" "}
            to{" "}
            {date?.to?.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="custom-scrollbar flex flex-col gap-4 overflow-y-auto pb-5 pt-4 md:max-h-[20.5rem] md:pb-0">
          <>
            <div className="grid grid-cols-3 gap-2 border-b px-5 pb-4 md:grid-cols-5">
              {["Meeting", "Time", "Notes", "Transcript", "Recording"]?.map(
                (item, index) => (
                  <h2
                    key={index}
                    className={classNames(
                      "text-xs font-medium text-zinc-500 md:text-sm",
                      item === "Notes" ||
                        item === "Transcript" ||
                        item === "Recording"
                        ? "hidden md:block"
                        : "",
                    )}
                  >
                    {item}
                  </h2>
                ),
              )}

              <h2
                className={
                  "text-xs font-medium text-zinc-500 md:hidden md:text-sm"
                }
              >
                Recourses
              </h2>
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
            {eventsByMonth &&
              month &&
              Object?.keys(eventsByMonth).length === 0 && (
                <p className=" pb-5 text-center text-sm font-medium">
                  No events found for this Range
                </p>
              )}
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
    <div key={event.id} className="grid grid-cols-3 gap-2 md:grid-cols-5">
      <h1 className="text-sm font-medium md:text-base">{event.summary}</h1>
      <p className="font-os text-xs text-zinc-400">
        {new Date(event.start.dateTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })}{" "}
        PST
      </p>
      <Links event={event} type={type} />
    </div>
  );
};

const Links = ({ event, type }: { event: Meeting; type?: string }) => {
  return (
    <div className="grid gap-2 md:col-span-3 md:grid-cols-3">
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
            ? event?.recordingUrl
            : `/community-hub/initiatives/meetings/${event?.slug}/#sub`
        }
        className={clsx(
          "flex gap-1 font-os text-xs",
          !event?.recordingUrl && "text-gray-300",
          event?.recordingUrl === "#" && "text-gray-300",
        )}
      >
        View Recording
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
};
