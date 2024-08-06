import classNames from "classnames";
import { ArrowRightCircle } from "lucide-react";
import discord from "../../../icons/socials/discord.svg";
import github from "../../../icons/socials/github.svg";
import twitter from "../../../icons/socials/twitter.svg";
type type = "blog" | "event" | "ambassador";

const BlogCard = ({
  blog,
  type = "blog",
  link,
  defaultImage,
  radius = "outer",
}: {
  blog: any;
  type?: type;
  link?: string;
  defaultImage?: any;
  radius?: "outer" | "inner";
}) => {
  const image: any = blog?.image
    ? blog?.image
    : defaultImage
      ? defaultImage
      : type === "ambassador"
        ? "/default/ambassador.png"
        : type === "event"
          ? "/default/events.png"
          : "/default/blog.png";

  const linkClass =
    "bg-gray-100 rounded-full bg-gray-100 p-1.5 text-secondary hover:text-gray-600";

  const href = {
    href: blog?.externalUrl ?? link,
    target: blog?.externalUrl ? "_blank" : "_self",
  };

  let author = {
    name: blog?.author?.name ?? blog.label ?? "Anonymous",
    discription: "",
  };
  // if (blog?.author?.id) {
  //   const res: any = await getEntry(blog?.author);
  //   author = res?.data;
  // }

  return (
    <li
      className={classNames(
        "group flex flex-col gap-5  border bg-white p-3 transition-all duration-300 hover:-translate-y-1",
        radius === "inner"
          ? "rounded-lg md:rounded-xl lg:rounded-2xl"
          : "rounded-5xl",
      )}
    >
      <a
        {...href}
        className={classNames(
          "overflow-hidden rounded-3xl bg-zinc-100",
          type === "ambassador" ? "aspect-[5/4] " : "aspect-[16/9] ",
        )}
      >
        <img
          className={classNames(
            "h-full w-full ",
            type === "ambassador"
              ? "object-cover "
              : image.height / image.width > 0.5
                ? "object-cover"
                : "object-contain",
          )}
          src={image.src}
          alt="blog"
        />
      </a>
      <div
        className={classNames(
          "flex flex-1 flex-col  ",
          type === "ambassador" ? "gap-1" : "gap-2.5",
        )}
      >
        {type === "blog" && (author?.name || blog?.tag) && (
          <div className="flex items-center justify-between">
            <p className="font-os text-xs font-light uppercase tracking-wide text-gray-400 ">
              {author.name}
            </p>
            {/* <Tag>{blog?.tag}</Tag> */}
          </div>
        )}
        {(type === "event" || type === "ambassador") && (
          <div className="flex items-center justify-between">
            <p
              className={classNames(
                "  uppercase tracking-wide text-zinc-500",
                type === "event" ? "text-xxs" : "text-xs",
              )}
            >
              {type === "ambassador" && <span>{blog?.location}</span>}
              {blog?.date && (
                <span>
                  <span>
                    {blog?.date?.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {blog?.endDate && (
                    <span>
                      {" - "}
                      {blog?.endDate?.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </span>
              )}
            </p>
            <div className="flex items-center gap-4">
              {blog?.links?.twitter && (
                <a
                  href={blog?.links?.twitter}
                  target={"_blank"}
                  className={linkClass}
                >
                  <img src={twitter.src} className="h-4 w-4" />
                </a>
              )}
              {blog?.links?.github && (
                <a
                  href={blog?.links?.github}
                  target={"_blank"}
                  className={linkClass}
                >
                  <img src={github.src} className="h-4 w-4" />
                </a>
              )}

              {blog?.links?.discord && (
                <a
                  href={blog?.links?.discord}
                  target={"_blank"}
                  className={linkClass}
                >
                  <img src={discord.src} className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
        <a
          {...href}
          className={classNames(
            "flex flex-1 flex-col  ",
            type === "ambassador" ? "gap-1" : "gap-2.5",
          )}
        >
          <h1
            className={classNames(
              " text-base font-medium text-zinc-900 md:text-xl lg:text-lg",
              blog?.description?.trim()?.length === 0 ? "" : "line-clamp-1",
            )}
          >
            {blog?.title}
          </h1>
          <p
            className={classNames(
              " font-os text-xs font-light text-zinc-500 md:text-sm lg:text-base",
              type === "ambassador" ? "line-clamp-2" : "line-clamp-4",
            )}
          >
            {blog?.description}
          </p>
        </a>
        <div className="flex justify-end pt-4">
          <a
            {...href}
            className="-rotate-45 transition-all duration-300 group-hover:rotate-0"
          >
            <ArrowRightCircle
              size={type === "ambassador" ? 44 : 50}
              className={
                type === "ambassador"
                  ? "stroke-[0.6] text-zinc-500"
                  : "stroke-[0.6] text-zinc-500"
              }
            />
          </a>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
