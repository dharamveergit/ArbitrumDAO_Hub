import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import classNames from "classnames";
import { ArrowUpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Button from "../ui/button";
const Events = ({
  events,
  type = "event",
}: {
  events: {
    title: string;
    description: string;
    date?: Date;
    image: {
      src: string;
    };
    externalUrl?: string;
  }[];
  type?: "event" | "ambassador" | "blog";
}) => {
  const data = new Array(9).fill(0).map((_, i) => ({
    image: `https://picsum.photos/id/${i + 22}/1000/1000`,
  }));
  const [active, setActive] = React.useState(0);
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
      <Swiper
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        spaceBetween={17}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-events",
          prevEl: ".swiper-button-prev-events",
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        className="relative aspect-[16/8] w-full rounded-small border  md:rounded-3xl lg:rounded-5xl"
      >
        {events?.map((data, i) => (
          <SwiperSlide key={i}>
            <div
              className={classNames(
                "h-full w-full  overflow-hidden rounded-md md:rounded-xl lg:rounded-small ",
              )}
            >
              <img
                src={data?.image?.src}
                alt={`Event Image ${i + 1}`}
                className={"h-full  w-full object-cover "}
              />
            </div>
          </SwiperSlide>
        ))}

        <button className="swiper-button-prev-events absolute left-5 top-1/2 z-[1] hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-zinc-300 text-white  md:flex ">
          <ChevronLeft size={28} strokeWidth={1.5} className="mr-0.5" />
        </button>
        <button className="swiper-button-next-events absolute right-5 top-1/2 z-[1] hidden h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-zinc-300 text-white md:flex ">
          <ChevronRight size={28} strokeWidth={1.5} className="ml-0.5" />
        </button>
      </Swiper>

      <div className="flex flex-col  justify-between gap-4 rounded-small border p-4 md:w-[26rem] md:rounded-3xl lg:rounded-5xl">
        <a
          href={events?.[active]?.externalUrl ?? "/community-hub/initiatives/"}
          className="flex flex-col gap-1 md:gap-6"
          target="_blank"
        >
          <p className="font-os text-xs font-light text-gray-500 md:text-sm lg:text-base">
            {events?.[active]?.date?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-base font-medium md:text-xl lg:text-2xl">
              {events?.[active]?.title}
            </h1>
            <p className="line-clamp-4 font-os text-xs font-light text-gray-500 md:text-sm lg:text-base">
              {events?.[active]?.description}
            </p>
          </div>
        </a>
        <div className="mt-8 flex justify-end">
          <Button href="/community-hub/initiatives/events/">
            All Upcoming Events
            <ArrowUpCircle
              size={20}
              strokeWidth={1}
              className="ml-1 rotate-45"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;
