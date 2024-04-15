import type { CollectionEntry } from "astro:content";
import classNames from "classnames";
import github from "../../../icons/socials/github.svg";
import twitter from "../../../icons/socials/twitter.svg";
import discord from "../../../icons/socials/discord.svg";
import { ArrowUpCircle } from "lucide-react";
type type = "blog" | "event" | "ambassador";

interface Props<T extends type> {
  blog: any;
  link?: string;
  type?: T;
}

const BlogCard = ({ blog, link = "#", type = "blog" }: Props<type>) => {
  const linkClass =
    "bg-gray-100 rounded-full bg-gray-100 p-1.5 text-secondary hover:text-gray-600";
  return (
    <li className="flex flex-col gap-5 rounded-5xl border bg-white p-3">
      <div className="aspect-[16/10] overflow-hidden rounded-3xl">
        <img
          className="h-full w-full object-cover"
          src={blog?.image?.src ?? "/temp.png"}
          alt="blog"
        />
      </div>
      <div className="flex flex-col gap-2.5 p-2.5">
        {type === "blog" && (
          <div className="flex items-center justify-between">
            <p className="font-os text-xs font-light uppercase tracking-wide text-gray-400 lg:text-sm">
              {blog?.label}
            </p>
            <button className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 font-os text-xxs text-gray-500">
              {blog?.tag}
            </button>
          </div>
        )}
        {(type === "event" || type === "ambassador") && (
          <div className="flex items-center justify-between">
            <p
              className={classNames(
                "  uppercase tracking-wide text-gray-500",
                type === "event" ? "text-xxs" : "text-xs",
              )}
            >
              {blog?.label}
              {blog?.date && (
                <span>
                  <span className="mx-1 text-gray-400">|</span>
                  <span>
                    {blog?.date?.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={blog?.links?.twitter}
                target={"_blank"}
                className={linkClass}
              >
                <img src={twitter.src} alt="twitter" className="h-4 w-4" />
              </a>
              <a
                href={blog?.links?.github}
                target={"_blank"}
                className={linkClass}
              >
                <img src={github.src} alt="github" className="h-4 w-4" />
              </a>
              <a
                href={blog?.links?.discord}
                target={"_blank"}
                className={linkClass}
              >
                <img src={discord.src} alt="discord" className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
        <h1 className="text-base font-medium text-gray-900 md:text-xl lg:text-2xl">
          {blog?.title}
        </h1>
        <p className="font-os text-xs font-light text-gray-500 md:text-sm lg:text-lg">
          {blog?.description}
        </p>
        <div className="flex justify-end">
          <a
            href={blog?.externalUrl ?? link}
            target={blog?.externalUrl ? "_blank" : "_self"}
            className="rotate-45 transition-all duration-300 hover:rotate-90"
          >
            <ArrowUpCircle className="h-14 w-14 stroke-[0.6] text-gray-500" />
          </a>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
