import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CollectionEntry, DataCollectionKey } from "astro:content";
import classNames from "classnames";
import { ArrowUpCircle } from "lucide-react";
import React from "react";
import Button from "../ui/button";

const HubTabs = ({ data }: any) => {
  const heading = "text-xl font-medium md:text-2xl lg:text-4xl";
  const description =
    "font-os text-xs font-light text-gray-500 md:text-xs lg:text-sm";

  return (
    <Tabs defaultValue={data.cards[0].label} className="hidden gap-10  md:flex">
      <TabsList className=" flex h-auto w-[30%] flex-col justify-start  gap-2  bg-white">
        {data.cards.map((product: any) => {
          return (
            <TabsTrigger
              key={product.label}
              value={product.label}
              className=" data-[state=active]:bg-primary-[#F3F7F8]  line-clamp-1 w-full justify-start border-b px-5  py-2.5  text-left text-xs font-medium  text-secondary data-[state=active]:rounded-full   data-[state=active]:bg-[#F3F7F8] data-[state=active]:text-secondary md:py-2.5 md:text-sm lg:py-5 lg:text-lg xl:text-xl"
            >
              {product.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {data.cards.map((product: any) => {
        return (
          <TabsContent
            key={product.label}
            value={product.label}
            className="flex-1"
          >
            <a
              href={product.link}
              className=" group flex flex-col   gap-4 rounded-3xl border p-5    lg:rounded-5xl"
            >
              <div className="relative aspect-[16/6] lg:aspect-[16/4]">
                <img
                  src={product.image}
                  alt={product.label}
                  className=" h-full  w-full rounded-xl object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black/40 to-transparent p-5 text-white">
                  <h1 className={heading}>{product.label}</h1>
                </div>
              </div>
              <p className={description}>{product.description}</p>

              {/* <ArrowUpCircle
                size={54}
                strokeWidth={0.6}
                className="ml-1  mt-3 flex rotate-45 self-end text-gray-500  transition-all duration-300 group-hover:rotate-90"
              /> */}
            </a>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default HubTabs;

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xs   font-normal uppercase tracking-widest text-gray-500 lg:text-base">
      {children}
    </p>
  );
};
