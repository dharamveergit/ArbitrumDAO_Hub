import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { tagCva } from "@/lib/cvas";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";
const TagSelect = ({
  all,
  pathname,
  tags,
}: {
  all: boolean;
  pathname: string;
  tags: string[];
}) => {
  const [windowWidth, setWindowWidth] = React.useState<number>(0);
  const [filteredTags, setFilteredTags] = React.useState<string[]>([]);
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
  }, []);
  console.log(filteredTags, pathname);

  useEffect(() => {
    if (pathname && pathname.split("/")[2]) {
      const activeTag = pathname.split("/")[2];
      const replaceFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);
      const upperActiveTag = replaceFirstLetter(activeTag);
      const activeTagIndex = tags.indexOf(upperActiveTag);

      if (activeTagIndex > -1) {
        const newTags = tags.filter((tag) => tag !== upperActiveTag);
        newTags.unshift(upperActiveTag);
        setFilteredTags(newTags);
      } else {
        setFilteredTags(tags);
      }
    } else {
      setFilteredTags(tags);
    }
  }, [pathname]);

  return (
    <div className="flex items-center gap-2 py-2">
      <a
        data-astro-reload
        className={tagCva({
          active: all,
          href: true,
        })}
        href="/blog/"
      >
        All
      </a>
      {filteredTags
        ?.slice(0, windowWidth < 768 ? 2 : windowWidth < 1024 ? 4 : 7)
        ?.map((tag) => (
          <a
            data-astro-reload
            key={tag}
            className={tagCva({
              active: pathname.includes(tag.toLowerCase()),
              href: true,
            })}
            href={`/blog/${tag.toLowerCase()}/1/`}
          >
            {tag}
          </a>
        ))}

      {filteredTags.length >
        (windowWidth < 768 ? 2 : windowWidth < 1024 ? 4 : 7) && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={classNames(
              tagCva({
                active: false,
                href: true,
              }),
              "flex  items-center gap-1",
            )}
          >
            More <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {filteredTags
              ?.slice(
                windowWidth < 768 ? 2 : windowWidth < 1024 ? 4 : 7,
                tags.length,
              )
              ?.map((tag) => (
                <DropdownMenuItem asChild key={tag}>
                  <a href={`/blog/${tag.toLowerCase()}/1/`} data-astro-reload>
                    {tag}
                  </a>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default TagSelect;
