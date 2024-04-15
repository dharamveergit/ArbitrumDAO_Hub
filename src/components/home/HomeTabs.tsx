import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roundedNavButtonClass } from "@/lib/cvas";
import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { ArrowUpCircle } from "lucide-react";
import React from "react";
import Button from "../ui/button";

interface homepage {
  home: CollectionEntry<"homepage">;
}

interface ecosystem {
  data: homepage["home"]["data"]["homepage"]["ecosystem"];
  type: "intro" | "ecosystem";
  size?: "default" | "large";
}

const HomeTabs = ({ data, type, size = "default" }: ecosystem) => {
  return (
    <Tabs
      defaultValue={data.products[0].label}
      className="flex flex-col gap-3 lg:gap-4 "
    >
      <TabsList className=" flex h-auto justify-start gap-2 overflow-x-auto bg-white p-0">
        {data.products.map((product) => {
          return (
            <TabsTrigger
              key={product.label}
              value={product.label}
              className="p-0 data-[state=active]:text-white [&[data-state=active]>div]:bg-secondary"
            >
              <div
                className={classNames(
                  roundedNavButtonClass({ variant: "children", size: size }),
                  " flex  justify-start",
                )}
              >
                {product.label}
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {data.products.map((product) => {
        return (
          <TabsContent
            key={product.label}
            value={product.label}
            className="mt-0"
          >
            <div className="flex flex-col-reverse items-center justify-between gap-3 rounded-small bg-gradient-to-b from-primary-light to-white p-3 md:gap-10 md:rounded-5xl md:p-5 lg:flex-row ">
              <div className="flex flex-col lg:w-1/2">
                <div className="flex flex-col gap-2 pb-10 lg:gap-4  lg:py-28  ">
                  <Badge> What it means for the users?</Badge>
                  <div className="">
                    <h1 className="text-lg font-medium md:text-2xl lg:text-3xl">
                      <span>{product.title} </span>
                      <br className="md:hidden lg:block" />
                      <span className={"text-primary"}>{product.subtitle}</span>
                    </h1>
                  </div>
                  <p
                    className={
                      "pt-3 font-os text-xs font-light text-gray-500 md:text-base lg:pt-0 lg:text-base"
                    }
                  >
                    {product.description}
                  </p>
                </div>{" "}
                <div className="flex items-start">
                  <Button href={product.url}>
                    Learn More
                    <ArrowUpCircle
                      size={20}
                      strokeWidth={1}
                      className="ml-1 rotate-45"
                    />
                  </Button>
                </div>
              </div>
              <div className="md:w-[60%] lg:w-1/2">
                <img
                  src={product.image.src}
                  alt={product.label}
                  className=" lg:aspect-[16/10]"
                />
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default HomeTabs;

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xs   font-normal uppercase tracking-widest text-gray-500 lg:text-sm">
      {children}
    </p>
  );
};
