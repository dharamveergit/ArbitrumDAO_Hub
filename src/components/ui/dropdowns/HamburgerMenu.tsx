import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { headerLinks } from "@/data/links/community-hub";
import { ArrowUpCircle, Sun, X } from "lucide-react";
import Button from "../button";

function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="focus:outline-none lg:hidden ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 6H20"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 18H20"
              stroke="#252525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-dvh w-full flex-col justify-between border-l-0 bg-secondary p-5 md:m-3  md:h-[550px] md:w-[35%] md:overflow-y-auto md:rounded-3xl">
        <div className="flex flex-col gap-4 text-white ">
          <SheetClose asChild className="ml-auto">
            <X size={25} />
          </SheetClose>
          <div className="flex flex-col ">
            {headerLinks?.length > 0 &&
              headerLinks?.map((link, i) =>
                link?.sublinks ? (
                  <div key={i}>
                    <div className="flex flex-col items-end gap-2.5">
                      <p className="font-os text-xs font-semibold text-[#636363]">
                        {link.name}
                      </p>{" "}
                      {link.sublinks && (
                        <div className="flex flex-col gap-2 " key={link.name}>
                          {link.sublinks.map((sublink) => (
                            <a
                              key={sublink.name}
                              href={sublink.href}
                              className="text-right text-lg font-normal"
                            >
                              {sublink.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="my-2.5 h-px bg-[#636363]"></div>
                  </div>
                ) : (
                  <div key={link.name}>
                    <div className="flex  justify-end gap-2">
                      <a className="text-lg font-normal" href={link.href}>
                        {link.name}
                      </a>
                    </div>
                    <div className="my-2.5 h-px bg-[#636363]"></div>
                  </div>
                ),
              )}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex w-full justify-end">
            <Button variant={"secondary"}>
              Arbitrum Docs
              <ArrowUpCircle
                size={20}
                strokeWidth={1}
                className="ml-1 rotate-45"
              />
            </Button>
          </div>
          <div className="my-5 h-px w-full bg-[#636363]"></div>
          <div className="flex items-center justify-between text-white">
            {/* <Sun size={20} /> */}
            <div className="flex items-center gap-5">
              {/* use svg */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="text-white"
              >
                <use href="/src/icons/socials/github.svg#github" />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="text-white"
              >
                <use href="/src/icons/socials/twitter.svg#twitter" />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="text-white"
              >
                <use href="/src/icons/socials/discord.svg#discord" />
              </svg>
            </div>
          </div>
        </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

export default HamburgerMenu;
