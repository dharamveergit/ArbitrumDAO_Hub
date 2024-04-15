import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownCircle } from "lucide-react";
const ContributionDropdown = () => {
  return (
    <section className="flex flex-col gap-2  py-5 md:gap-4 md:py-10">
      <h1 className=" text-lg  font-medium md:text-xl lg:text-2xl">
        How to contribute
      </h1>

      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="flex justify-between gap-5 p-0 md:gap-6 lg:gap-10 ">
            <p className="flex-1 text-left font-os text-xs font-light  text-gray-800 md:w-[60%] md:flex-auto md:text-sm lg:w-full lg:flex-1 lg:text-base">
              Are you eager to impart your insights and knowledge to the vibrant
              community? Explore this comprehensive guide on how you can
              actively contribute to this dynamic and evolving space.
            </p>
            <svg
              width="40"
              height="40"
              viewBox="0 0 54 54"
              fill="none"
              className="size-6 md:size-10"
              xmlns="https://www.w3.org/2000/svg"
            >
              <circle cx="27" cy="27" r="26.5" stroke="#636363" />
              <path
                d="M17 24L25.5858 32.5858C26.3668 33.3668 27.6332 33.3668 28.4142 32.5858L37 24"
                stroke="#323232"
                strokeLinecap="round"
              />
            </svg>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-10 pt-10 md:grid-cols-3 md:gap-x-0 md:px-2.5 lg:grid-cols-4  lg:pl-10  lg:pr-0">
              {[
                {
                  title: "Fork the Repository",
                  description:
                    "Fork the repository of the website's code to your GitHub account.",
                },
                {
                  title: "Clone the Repository",
                  description:
                    "Clone the forked repository to your local machine.",
                },
                {
                  title: "Create a Branch",
                  description: "Create a new branch to make your changes.",
                },
                {
                  title: "Add or Update Content",
                  description:
                    "Add your photo, video, or blog/article to the appropriate directory in the repository.",
                },
                {
                  title: "Commit Changes",
                  description:
                    "Commit the added or updated content to your branch.",
                },
                {
                  title: "Push Changes",
                  description:
                    "Push the changes to your forked repository on GitHub.",
                },
                {
                  title: "Create Pull Request",
                  description:
                    "Create a pull request to merge your changes into the main repository.",
                },
                {
                  title: "Review Changes",
                  description:
                    "Review the changes and make any necessary adjustments.",
                },
                {
                  title: "Merge Pull Request",
                  description:
                    "Once the pull request is approved, the maintainers will merge your changes into the main branch of the original repository.",
                },
              ].map((data, i) => (
                <li className="flex flex-col  " key={i}>
                  <p className="border-b-2 border-primary pb-2 font-os  text-xs font-light uppercase text-gray-700 md:pb-5 lg:text-sm">
                    Step 0{i + 1}
                  </p>
                  <div className="mt-2.5 flex flex-col gap-2.5 md:pr-5 lg:pr-14">
                    <h1 className="font-medium text-gray-800 md:text-lg lg:text-2xl">
                      {data.title}
                    </h1>
                    <p className="font-os text-xs font-light text-gray-800 lg:text-sm">
                      {data.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ContributionDropdown;
