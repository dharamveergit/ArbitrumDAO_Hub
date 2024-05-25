import React, { useEffect } from "react";
import clsx from "clsx";
const BackToTop = () => {
  const [scroll, setScroll] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  console.log(scroll, visible);

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className={clsx(
        "fixed bottom-4 right-4 z-50  flex size-12 items-center justify-center rounded-full bg-[#213147] text-zinc-500 transition-all duration-500 ease-in-out 2xl:size-14",
        visible ? "visible" : "invisible bottom-[-100%]",
      )}
    >
      <svg
        // width="21"
        className="size-5"
        // height="23"
        viewBox="0 0 21 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5688 21.9184L10.5687 1.2184M10.5687 1.2184L1.51251 10.2746M10.5687 1.2184L19.625 10.2747"
          stroke="#FAFAFA"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackToTop;
