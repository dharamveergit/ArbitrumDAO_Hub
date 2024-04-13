import Button from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DelegateHub_Page } from "@/consts";
import { roundedNavButtonClass } from "@/lib/cvas";
import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { ArrowUpCircle } from "lucide-react";
import React from "react";

type Data = typeof DelegateHub_Page.questionsTabs;

interface ecosystem {
  data: Data;
  type: "intro" | "ecosystem";
  size?: "default" | "large";
}

const QuestionsTabs = ({ data, size = "default" }: ecosystem) => {
  return (
    <Tabs
      defaultValue={data[0].label}
      className="flex flex-col gap-3 lg:gap-4 "
    >
      <TabsList className=" flex h-auto justify-start gap-2 overflow-x-auto bg-white p-0">
        {data.map((question) => {
          return (
            <TabsTrigger
              key={question.label}
              value={question.label}
              className="p-0 data-[state=active]:text-white [&[data-state=active]>div]:bg-secondary"
            >
              <div
                className={classNames(
                  roundedNavButtonClass({ variant: "children", size: size }),
                  " flex  justify-start",
                )}
              >
                {question.label}
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {data.map((question) => {
        return (
          <TabsContent
            key={question.label}
            value={question.label}
            className="mt-0"
          >
            <div className="flex flex-col-reverse items-center justify-between gap-3 rounded-small border  p-3 md:gap-10 md:rounded-5xl md:p-5 lg:flex-row ">
              <div className="flex flex-col lg:w-1/2">
                <div className="flex flex-col gap-2 pb-10 lg:gap-4   ">
                  <Badge> {question.miniTitle}</Badge>
                  <div className="">
                    <h1 className="text-lg font-medium md:text-2xl lg:text-3xl">
                      <span>{question.title} </span>
                      <br className="md:hidden lg:block" />
                    </h1>
                  </div>
                  <p
                    className={
                      "pt-3 font-os text-xs font-light text-gray-500 md:text-base lg:pt-0 lg:text-base"
                    }
                  >
                    {question.description}
                  </p>
                </div>
                <div className="flex items-start">
                  <Button href={question.cta.url}>
                    {question.cta.label}
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
                  src={question.image.src}
                  alt={question.label}
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

export default QuestionsTabs;

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xs   font-normal uppercase tracking-widest text-gray-500 lg:text-sm">
      {children}
    </p>
  );
};
