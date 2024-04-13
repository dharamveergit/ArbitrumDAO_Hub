import { Search } from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { CollectionEntry } from "astro:content";

function BlogSearch({ posts }: { posts: Array<CollectionEntry<"blogs">> }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [filterByTagPosts, setFilterByTagPosts] = React.useState<{
    [key: string]: CollectionEntry<"blogs">[];
  } | null>(null);

  React.useEffect(() => {
    const uniqueTag = new Set<string>();
    posts.forEach(({ data }) => {
      uniqueTag.add(data.tag || "");
    });
    console.log(uniqueTag);

    const filterByTagPosts: { [key: string]: CollectionEntry<"blogs">[] } = {};
    uniqueTag.forEach((tag) => {
      filterByTagPosts[tag] = posts.filter(({ data }) => data.tag === tag);
    });
    setFilterByTagPosts(filterByTagPosts);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((open) => !open)}
        className="flex w-[35rem] max-w-full items-center justify-between rounded-full border border-zinc-200 px-5 py-2 md:py-2.5 "
      >
        <div className="flex items-center">
          <Search
            className="size-4 stroke-[1.3] text-zinc-500  md:size-5"
            aria-label="Search blog posts "
          />
          <p className=" ml-2  text-sm font-light text-zinc-300 lg:text-base">
            Search for blogs or keywords
          </p>
        </div>

        <kbd className="pointer-events-none hidden h-5  select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 md:inline-flex md:text-sm">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filterByTagPosts &&
            Object.keys(filterByTagPosts).map((tag, i) => (
              <React.Fragment key={i}>
                <CommandGroup key={tag} heading={tag}>
                  {filterByTagPosts[tag].map(({ data, slug }) => (
                    <a href={`/blog/${slug}`} key={data.title}>
                      <CommandItem className="cursor-pointer rounded-md hover:rounded-md">
                        {data.title}
                      </CommandItem>
                    </a>
                  ))}
                </CommandGroup>
                {i !== Object.keys(filterByTagPosts).length - 1 && (
                  <CommandSeparator key={tag} />
                )}
              </React.Fragment>
            ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default BlogSearch;
