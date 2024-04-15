import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CollectionEntry } from "astro:content";
import Gallery from "@/components/swipers/Gallery";
import Events from "@/components/swipers/Events";
import classNames from "classnames";
import { roundedNavButtonClass } from "@/lib/cvas";

import TopAmbassadors, { WhatNew } from "@/components/community-hub/what-new";
import { DISCORD_URL, GITHUB_URL, TWITTER_URL } from "@/consts";

const SwiperCards = ({
  tabs,
  gallery,
  events,
  title = "Whats happening in Arbitrum DAO",
  ambassadors,
  contributions,
}: {
  tabs: ("Events" | "Gallery" | "Top Ambassadors" | "What's New")[];
  gallery?: any;
  events?: CollectionEntry<"Community_Events">[];
  ambassadors?: CollectionEntry<"Community_Ambassadors">[];
  title?: string;
  contributions?: CollectionEntry<"Community_Ambassadors">[];
}) => {
  console.log({ events, gallery });

  return (
    <div className="flex flex-col gap-4 py-5 md:gap-8 md:py-10">
      <h1 className="text-lg font-medium md:text-xl lg:w-[35%] lg:text-2xl xl:w-[30%]">
        {title}
      </h1>

      <Tabs defaultValue={tabs[0]} className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <TabsList className=" flex h-auto justify-start gap-2 overflow-x-auto bg-white p-0">
            {tabs.map((product) => {
              return (
                <TabsTrigger
                  key={product}
                  value={product}
                  className={classNames(
                    roundedNavButtonClass({ variant: "children" }),
                    "justify-start  data-[state=active]:bg-secondary data-[state=active]:text-white",
                  )}
                >
                  {product}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className=" flex gap-4 text-gray-500 md:gap-8">
            <a href={GITHUB_URL} target="_blank">
              {icons?.github}
            </a>
            <a href={TWITTER_URL} target="_blank">
              {icons?.twitter}
            </a>
            <a href={DISCORD_URL} target="_blank">
              {icons?.discord}
            </a>
          </div>
        </div>
        {tabs.map((product) => {
          return (
            <TabsContent key={product} value={product} className="mt-0 p-0">
              {
                {
                  Events: (
                    <Events
                      events={
                        events?.map(({ data }) => ({
                          title: data.title,
                          description: data.description,
                          date: data.date || new Date(), // Ensure date is not undefined
                          image: {
                            src: data?.image?.src ?? "/default/hackathons.png",
                          },
                          externalUrl: data?.externalUrl,
                        })) ?? []
                      }
                    />
                  ),
                  Gallery: <Gallery gallery={gallery} />,
                  "Top Ambassadors": (
                    <TopAmbassadors ambassadors={ambassadors} />
                  ),
                  "What's New": <WhatNew ambassadors={contributions} />,
                }[product]
              }
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SwiperCards;

const icons = {
  github: (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      className="size-4 md:size-8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_671_13791)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.9523 0.596191C7.1311 0.596191 0 7.92952 0 17.0019C0 24.2539 4.56914 30.3925 10.9078 32.5652C11.7002 32.7285 11.9905 32.2122 11.9905 31.7779C11.9905 31.3975 11.9644 30.0939 11.9644 28.7355C7.52686 29.7135 6.60278 26.7799 6.60278 26.7799C5.88963 24.8785 4.83298 24.3899 4.83298 24.3899C3.38057 23.3849 4.93878 23.3849 4.93878 23.3849C6.54988 23.4935 7.39527 25.0689 7.39527 25.0689C8.82123 27.5675 11.119 26.8615 12.0434 26.4269C12.1753 25.3675 12.5982 24.6342 13.0472 24.2269C9.50792 23.8465 5.78416 22.4342 5.78416 16.1325C5.78416 14.3399 6.41763 12.8732 7.42139 11.7325C7.26302 11.3252 6.70825 9.64086 7.58008 7.38653C7.58008 7.38653 8.92702 6.95186 11.9641 9.07053C13.2644 8.71141 14.6053 8.52873 15.9523 8.52719C17.2993 8.52719 18.6723 8.71753 19.9402 9.07053C22.9776 6.95186 24.3246 7.38653 24.3246 7.38653C25.1964 9.64086 24.6413 11.3252 24.4829 11.7325C25.5131 12.8732 26.1205 14.3399 26.1205 16.1325C26.1205 22.4342 22.3967 23.8192 18.831 24.2269C19.4122 24.7429 19.9138 25.7205 19.9138 27.2689C19.9138 29.4689 19.8877 31.2345 19.8877 31.7775C19.8877 32.2122 20.1783 32.7285 20.9705 32.5655C27.3091 30.3922 31.8782 24.2539 31.8782 17.0019C31.9043 7.92952 24.7471 0.596191 15.9523 0.596191Z"
          fill="#71717A"
        />
      </g>
      <defs>
        <clipPath id="clip0_671_13791">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0 0.596191)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  twitter: (
    <svg
      width="32"
      height="27"
      className="size-4 md:size-8"
      viewBox="0 0 32 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.2019 0.964844H30.1087L19.3887 11.6661L32 26.228H22.1239L14.3898 17.3963L5.54026 26.228H0.630418L12.0966 14.7818L0 0.964844H10.1238L17.1147 9.03739L25.1989 0.964844H25.2019ZM23.4797 23.6628H26.1987L8.64785 3.39529H5.73013L23.4797 23.6628Z"
        fill="#71717A"
      />
    </svg>
  ),
  discord: (
    <svg
      width="32"
      height="33"
      className="size-4 md:size-8"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.1654 7.38075C24.296 6.52275 22.2907 5.89075 20.1947 5.52875C20.1567 5.52208 20.1187 5.53942 20.0987 5.57408C19.8407 6.03275 19.5554 6.63075 19.3554 7.10142C17.1007 6.76408 14.8574 6.76408 12.6494 7.10142C12.4494 6.62075 12.1534 6.03275 11.894 5.57408C11.874 5.54008 11.836 5.52275 11.798 5.52875C9.70269 5.88942 7.69802 6.52142 5.82736 7.38075C5.81136 7.38742 5.79736 7.39942 5.78802 7.41475C1.98536 13.0961 0.943359 18.6381 1.45469 24.1108C1.45669 24.1374 1.47203 24.1634 1.49269 24.1794C4.00136 26.0221 6.43202 27.1408 8.81736 27.8821C8.85536 27.8934 8.89603 27.8801 8.92002 27.8481C9.48403 27.0774 9.98736 26.2654 10.4187 25.4107C10.444 25.3608 10.42 25.3014 10.368 25.2814C9.57002 24.9788 8.81069 24.6101 8.08002 24.1907C8.02203 24.1567 8.01736 24.0741 8.07069 24.0347C8.22469 23.9194 8.37803 23.7994 8.52536 23.6788C8.55202 23.6567 8.58869 23.6521 8.62003 23.6661C13.4207 25.8581 18.618 25.8581 23.362 23.6661C23.3934 23.6507 23.43 23.6554 23.458 23.6774C23.6047 23.7988 23.7587 23.9194 23.9134 24.0347C23.9667 24.0741 23.9634 24.1567 23.9054 24.1907C23.1747 24.6181 22.4147 24.9788 21.616 25.2801C21.564 25.3001 21.5407 25.3601 21.566 25.4107C22.0067 26.2641 22.5094 27.0761 23.0634 27.8468C23.0867 27.8794 23.128 27.8934 23.166 27.8814C25.5627 27.1401 27.9934 26.0214 30.502 24.1788C30.524 24.1628 30.538 24.1381 30.54 24.1114C31.1514 17.7841 29.5154 12.2881 26.2034 7.41542C26.1954 7.39942 26.1814 7.38742 26.1654 7.38075ZM11.1354 20.7781C9.69002 20.7781 8.49936 19.4514 8.49936 17.8214C8.49936 16.1914 9.66736 14.8647 11.1354 14.8647C12.6154 14.8647 13.7947 16.2034 13.7714 17.8214C13.772 19.4508 12.604 20.7781 11.1354 20.7781ZM20.8827 20.7781C19.4374 20.7781 18.2467 19.4514 18.2467 17.8214C18.2467 16.1914 19.4147 14.8647 20.8827 14.8647C22.3627 14.8647 23.542 16.2034 23.5187 17.8214C23.5187 19.4508 22.3627 20.7781 20.8827 20.7781Z"
        fill="#71717A"
      />
    </svg>
  ),
};
