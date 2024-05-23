import { ambassadors } from "@/data/schema/community";
import type { CollectionEntry } from "astro:content";
import { cva } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import dayjs, { type Dayjs } from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filteredAmbassadors = (
  ambassadors: Array<CollectionEntry<"Community_Ambassadors">>,
) => {
  return ambassadors.filter((ambassador) => {
    return ambassador.slug.split("/").length === 2;
  });
};

export const isNoDataAvailable = (data: any) => {
  return data?.length === 1 && data?.[0]?.data.title === "no_data_available";
};

export const getSplitText = (
  text: string,
  start: number = 5,
  end: number = 5,
) => {
  const splittedText = [
    text?.slice(0, start),
    "...",
    text?.slice(text?.length - end),
  ].join("");

  return splittedText;
};

export function convertToMillions(value: bigint): string {
  const result: number = Number(value) / 1000000.0; // Divide by 1 million
  const formattedResult: string = result.toFixed(2) + "M"; // Round to two decimal places and append "M" suffix
  return formattedResult;
}

export const getDateFromTimestamp = (timestamp: number): Dayjs => {
  return dayjs(timestamp);
};

export const getTimestampFromIetf = (ietfTimestamp: string): number => {
  return Date.parse(ietfTimestamp);
};

export const getUrl = (item: string, pathname: string, data: string[]) => {
  const base = "/ecosystem-hub/grant-projects/";
  let link = pathname
    .replace(base, "")
    .replace("all", "")
    .split("/")
    .filter((i) => i !== "");

  if (pathname.includes(item)) {
    link = link.filter((i) => i !== item);
  } else {
    link.push(item);
  }

  console.log(link);

  //sort so that same as the order in data
  if (link.length === 0) return `${base}all#filter`;

  link = link.sort((a, b) => {
    return data.indexOf(a) - data.indexOf(b);
  });

  return base + link.join("/") + "#filter";
};

export const getRemoveUrl = (
  item: string,
  pathname: string,
  data: string[],
) => {
  return (
    "/ecosystem-hub/grant-projects/" +
    data.filter((i) => i !== item).join("/") +
    "#filter"
  );
};
