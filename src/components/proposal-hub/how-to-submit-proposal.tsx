import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { titleCva } from "@/lib/cvas";
import { useState } from "react";

const HowToSubmitProposal = ({ steps = [] }) => {
  return (
    <section className="not-prose flex flex-col lg:gap-6">
      <Accordion
        type="single"
        collapsible
        className="w-full  font-os "
        defaultValue={"1"}
      >
        <AccordionItem className="border-0" value={"1"}>
          <AccordionTrigger className="items-end  [&>.arrow]:hidden [&[data-state=open]>.arrow]:block [&[data-state=open]>.plus]:hidden">
            <div className="flex w-full flex-col items-start ">
              <h3 className="text-left font-medium  text-zinc-900 lg:text-2xl">
                How to submit a proposal
              </h3>
              <p className="mt-4 text-base font-light text-zinc-700">
                This guide will walk you through the process of submitting an
                Arbitrum Improvement Proposal (AIP) to the Arbitrum DAO.
              </p>
            </div>

            <svg
              className={`arrow size-3 md:size-4 lg:size-7`}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="19.6296"
                transform="rotate(-180 20 20)"
                stroke="#71717A"
                strokeWidth="0.740741"
              />
              <path
                d="M27.4062 22.2223L21.0464 15.8624C20.4679 15.2839 19.5298 15.2839 18.9513 15.8624L12.5914 22.2223"
                stroke="#71717A"
                strokeWidth="0.740741"
                strokeLinecap="round"
              />
            </svg>

            <svg
              className={`plus size-3 rotate-180  md:size-4 lg:size-7`}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="https://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="19.6296"
                stroke="#71717A"
                stroke-width="0.740741"
              />
              <path
                d="M12.5938 17.7777L18.9536 24.1375C19.5321 24.7161 20.4702 24.7161 21.0487 24.1375L27.4086 17.7777"
                stroke="#71717A"
                stroke-width="0.740741"
                stroke-linecap="round"
              />
            </svg>
          </AccordionTrigger>

          <AccordionContent className="mt-20">
            <StepsGrid steps={steps} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default HowToSubmitProposal;

const StepsGrid = ({ steps }: any) => {
  return (
    <div className="grid gap-y-10 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((icon: any, index: any) => (
        <div className="flex flex-col  gap-5" key={index}>
          <div className="flex items-center gap-2 border-b-2 border-primary pb-5">
            <img
              src={icon.image}
              alt={icon.title}
              width={32}
              height={32}
              className={"size-8 object-contain"}
            />
            <small className="font-os text-xs font-light">
              STEP 0{index + 1}
            </small>
          </div>
          <div className="flex flex-col gap-2.5 pr-6">
            <h2
              className={
                (titleCva({ size: "sm" }),
                "font-sans text-base font-medium  md:text-lg lg:text-xl")
              }
            >
              {icon.title}
            </h2>

            <ul className="flex list-inside list-disc flex-col  gap-2.5 pl-2">
              {icon.points.map((step: any, index: any) => (
                <li
                  className="font-os text-xs font-light text-zinc-700 lg:text-sm"
                  key={index}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
