import React, { useId, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import classNames from "classnames";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

const Gallery = ({
  gallery,
}: {
  gallery:
    | {
        imgBy: string;
        img: { src: string };
      }[]
    | any[];
}) => {
  const [active, setActive] = React.useState(0);
  const swiperRef = useRef<any>(null);
  const id = useId();
  console.log(active);

  return (
    <div className="mt-2 flex flex-col gap-2.5 md:mt-3 md:gap-7 lg:mt-5 lg:gap-10">
      <div className="  flex text-gray-500 ">
        <Swiper
          loop
          modules={[Navigation, Autoplay, EffectCoverflow]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          effect={"coverflow"}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          grabCursor={true}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1068: {
              slidesPerView: 3,
            },
          }}
          pagination={true}
          navigation={{
            nextEl: `.swiper-button-next-gallery`,
            prevEl: ".swiper-button-prev-gallery",
          }}
          className="w-full "
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {gallery?.map((item: any, i: any) => (
            <SwiperSlide key={i} className="py-3 ">
              <div
                className={classNames(
                  "relative aspect-[16/10] overflow-hidden rounded-xl  lg:rounded-small ",
                )}
              >
                <img
                  src={item.img.src}
                  alt={`Gallery Image ${i + 1}`}
                  className={"h-full  w-full object-cover "}
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black to-transparent px-5 py-3">
                  <h1 className="font-medium text-white"> {item.imgBy}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>{" "}
      </div>
      <div className="flex items-center justify-center gap-2">
        {gallery?.map((item: any, i: any) => (
          <button
            key={i}
            className={classNames(
              "h-2 w-2 rounded-full",
              active === i ? "bg-zinc-400" : "bg-zinc-200",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
