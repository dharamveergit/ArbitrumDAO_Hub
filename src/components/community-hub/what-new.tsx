import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import type { CollectionEntry } from "astro:content";
const TopAmbassadors = ({
  ambassadors,
}: {
  ambassadors?: CollectionEntry<"Community_Ambassadors">[];
}) => {
  return (
    <div className="flex flex-col-reverse items-center rounded-small border p-2 shadow-sm md:flex-row md:gap-16 md:rounded-3xl md:px-6 md:py-10 lg:gap-20 lg:rounded-5xl lg:px-20">
      <div className="flex flex-col gap-2 px-3 py-5 md:w-[45%] md:gap-8 md:p-0">
        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">
          What's happening in <br className="hidden md:block" /> Arbitrum DAO
        </h1>
        <p className="text-xs text-zinc-500 md:text-sm lg:text-base">
          Introducing the leading Arbitrum DAO ambassadors, pivotal in driving
          innovation and growth within the ecosystem. With their profound
          expertise and dedication to decentralization, they are instrumental in
          the success of the Pluralistic Grants Framework and are shaping the
          future of web3, fostering a vibrant and sustainable ecosystem in
          Arbitrum DAO.
        </p>
      </div>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        loop
        autoplay
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className="w-full md:w-[55%]"
      >
        {ambassadors?.map(({ data, slug }, i) => (
          <SwiperSlide key={i}>
            <a
              href={`/community-hub/ambassadors/near-you/${slug?.split("/")?.[0]}/contributions`}
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-zinc-500 lg:rounded-2xl">
                <img
                  src={data?.image?.src}
                  alt={`Ambassador ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-[1] flex items-end justify-between rounded-xl bg-gradient-to-t from-black to-transparent px-5 py-3 lg:rounded-2xl">
                  <h1 className="font-medium text-white"> {data?.title}</h1>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopAmbassadors;
export const WhatNew = ({
  ambassadors,
}: {
  ambassadors?: CollectionEntry<"Community_Ambassadors">[];
}) => {
  return (
    <div className="flex flex-col-reverse items-center rounded-small border p-2 shadow-sm md:flex-row md:gap-16 md:rounded-3xl md:px-6 md:py-10 lg:gap-20 lg:rounded-5xl lg:p-10">
      <div className="flex flex-col gap-2 px-3 py-5 md:w-[30%] md:gap-8 md:p-0">
        <h1 className="text-lg font-medium md:text-xl lg:text-2xl">
          What's happening in <br className="hidden md:block" /> Arbitrum DAO
        </h1>
        <p className="text-xs text-zinc-500 md:text-sm lg:text-base">
          Dive Into the Visual World of Arbitrum DAO: Discover Events, Meetups,
          and Community Highlights Captured in Images.
        </p>
      </div>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        loop
        autoplay
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}
        className="w-full flex-1 md:w-[70%]"
      >
        {ambassadors?.map(({ data, type, slug }: any, i) => (
          <SwiperSlide key={i}>
            <a
              href={
                data.externalUrl
                  ? data.externalUrl
                  : type === "community"
                    ? `/community-hub/contributions/${slug}`
                    : `/community-hub/ambassadors/near-you/${slug}`
              }
              target={data.externalUrl ? "_blank" : "_self"}
            >
              <div className="relative aspect-[16/9]  w-full overflow-hidden rounded-xl bg-zinc-500 lg:rounded-2xl">
                <img
                  src={data?.image?.src}
                  alt={`Ambassador ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-[1] flex items-end justify-between rounded-xl bg-gradient-to-t from-black to-transparent px-5 py-3 lg:rounded-2xl">
                  <h1 className="font-medium text-white"> {data?.title}</h1>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
