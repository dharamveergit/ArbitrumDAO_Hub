import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import { ArrowUpCircle } from "lucide-react";
import React from "react";

const HubTabsMobile = ({ data }: any) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={data.cards[0].label}
      className="flex flex-col gap-5  md:hidden"
    >
      {data.cards.map((product: any, index: any) => {
        return (
          <AccordionItem
            value={product.label}
            key={product.label}
            className={classNames(
              "data-[state=open]:border-b-0",
              index === data.cards.length - 1 ? "border-b-0" : "",
            )}
          >
            <AccordionTrigger className=" w-full justify-start   p-2.5 text-left  text-base  font-medium  text-secondary data-[state=open]:rounded-full data-[state=open]:bg-[#F3F7F8]  data-[state=active]:text-secondary data-[state=open]:no-underline   data-[state=open]:focus:no-underline md:py-3 md:text-xl lg:py-5 lg:text-2xl [&>svg]:hidden">
              {product.label}
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-7 flex flex-col gap-2 rounded-2xl border p-3  ">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.label}
                    className=" aspect-[16/6] rounded-lg border"
                  />
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-xl bg-gradient-to-t from-black to-transparent p-5 text-white">
                    <h1
                      className={"text-xl font-medium md:text-2xl lg:text-4xl"}
                    >
                      {product.label}
                    </h1>
                  </div>
                </div>
                <p className="font-os text-xs font-light text-gray-500 md:text-base lg:text-xl">
                  {product.description}
                </p>
                <div className="mt-3 flex justify-end">
                  {/* <a>
                    <ArrowUpCircle
                      size={32}
                      strokeWidth={0.6}
                      className="ml-1 rotate-45 text-gray-500"
                    />
                  </a> */}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default HubTabsMobile;
