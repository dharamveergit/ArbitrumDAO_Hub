import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Developer_HomePage } from "@/consts";
import { Plus } from "lucide-react";
import { titleCva } from "@/lib/cvas";
const Faq = ({
  questions,
}: {
  questions: {
    question: string;
    answer: string;
  }[];
}) => {
  return (
    <section className="not-prose flex flex-col gap-6">
      <h1 className={titleCva()}>FAQs</h1>
      <Accordion type="single" collapsible className="w-full  font-os">
        {questions.map((q, i) => (
          <AccordionItem key={i} value={i.toString()}>
            <AccordionTrigger className="flex justify-between gap-3 pt-5 md:pt-10 [&>.arrow]:hidden  [&[data-state=open]>.arrow]:block  [&[data-state=open]>.plus]:hidden">
              <h3 className="flex-1 text-left text-sm text-zinc-900 md:text-lg">
                {q.question}
              </h3>
              <svg
                className="arrow h-4 w-4 text-zinc-500 "
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <Plus size={16} className="plus text-zinc-500" />
            </AccordionTrigger>
            <AccordionContent className="pb-5 md:pb-10">
              <div
                className=" text-sm text-gray-500 lg:text-base "
                dangerouslySetInnerHTML={{
                  __html: q.answer,
                }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
