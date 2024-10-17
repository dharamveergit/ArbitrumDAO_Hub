import clsx from "clsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GamesCarousal = () => {
  const slides = [
    {
      images: [
        {
          image: "/gcp/ecosystem/smol.png",

          title: "Smol",
        },
        {
          image: "/gcp/ecosystem/dream.png",
          title: "Snako",
          description: "Dream Machine",
        },
      ],
    },

    {
      image: "/gcp/ecosystem/xai.png",
      title: "XAI",
      description:
        "Xai unlocks open trade for billions of gamers in thousands of in-game economies.",
      long: true,
    },

    {
      image: "/gcp/ecosystem/battle.png",
      description: "Where fun Meets Chaos",
      title: "Battle Plan",
    },

    {
      image: "/gcp/ecosystem/pirate.png",
      description: "The world of Pirate Nation",
      title: "Pirate Nation",
    },
    {
      image: "/gcp/ecosystem/sky.png",

      title: "Skyborne Genesis",
      medium: true,
    },
    {
      image: "/gcp/ecosystem/auroians.png",
      description: "ADVENTURE CREATURE COLLECTION GAME",
      title: "Aurorians",
      long: true,
    },
    {
      image: "/gcp/ecosystem/kuroro.png",
      description: "FARM, MAKE FRIENDS, CATCH $KURO!",
      title: "Kuroro Ranch",
      long: true,
    },
    {
      image: "/gcp/ecosystem/gold.png",
      description: "Mighty Action Heroes",
      title: "Gold and Glimmer",
      medium: true,
    },
  ];

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-medium md:text-2xl lg:text-3xl">
        Explore the Ecosystem
      </h2>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={"auto"}
        spaceBetween={4}
        navigation
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={clsx(
              "h-[18rem] ",
              slide?.images?.length
                ? "relative grid  w-36 grid-rows-2 gap-1"
                : slide.long
                  ? "w-[48rem]"
                  : slide.medium
                    ? "w-[42rem]"
                    : "w-[32rem]",
            )}
          >
            {slide?.images?.length ? (
              slide.images.map((image, index) => (
                <div className="relative" key={index}>
                  <Overlay data={image} />
                  <img
                    src={image.image}
                    alt={image.title}
                    className={
                      "aspect-square h-full w-full  rounded-lg object-cover"
                    }
                  />{" "}
                </div>
              ))
            ) : (
              <>
                <Overlay data={slide as any} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={"h-full w-full rounded-lg object-cover"}
                />
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default GamesCarousal;

const Overlay = ({
  data,
}: {
  data: {
    title: string;
    description?: string;
  };
}) => {
  return (
    <div className="absolute inset-0 flex flex-col  justify-end rounded-lg bg-gradient-to-b from-transparent via-black/20 to-black p-3">
      <h3 className="font-medium text-white">{data.title}</h3>
      {data.description && (
        <p className="text-sm text-gray-200 ">{data.description}</p>
      )}
    </div>
  );
};
