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

function EcosystemSearch({
  collection,
}: {
  collection: {
    title: string;
    description: string;
    projects: Array<CollectionEntry<"Grant_Hub">>;

    projectsLength: number;
  }[];
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: any) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // const [filterByTagPosts, setFilterByTagPosts] = React.useState<{
  //   [key: string]: CollectionEntry<"Grant_Hub">[];
  // } | null>(null);

  // React.useEffect(() => {
  //   const uniqueTag = new Set<string>();
  //   collection.forEach(({ data }) => {
  //     uniqueTag.add(data.tag || "");
  //   });
  //   console.log(uniqueTag);

  //   const filterByTagPosts: { [key: string]: CollectionEntry<"Grant_Hub">[] } =
  //     {};
  //   uniqueTag.forEach((tag) => {
  //     filterByTagPosts[tag] = collection.filter(({ data }) => data.tag === tag);
  //   });
  //   setFilterByTagPosts(filterByTagPosts);
  // }, []);

  return (
    <>
      <button
        onClick={() => setOpen((open: any) => !open)}
        className="flex w-[35rem] max-w-full items-center justify-between rounded-full border border-zinc-200 px-5 py-2 md:py-2.5 "
      >
        <div className="flex items-center">
          <Search
            className="size-4 stroke-[1.3] text-zinc-500  md:size-5"
            aria-label="Search blog posts "
          />
          <p className=" ml-2 text-xs font-light text-zinc-300 md:text-sm lg:text-base">
            Search for projects or keywords
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

          {collection &&
            collection.map((tag, i) => (
              <React.Fragment key={i}>
                <CommandGroup key={tag.title} heading={tag.title}>
                  {tag.projects.map(({ data, slug }) => (
                    <a href={data.externalUrl} key={data.title}>
                      <CommandItem
                        key={data.title}
                        className="cursor-pointer rounded-md hover:rounded-md"
                      >
                        {data.title}
                      </CommandItem>
                    </a>
                  ))}
                </CommandGroup>
                {i !== collection.length - 1 && (
                  <CommandSeparator key={tag.title} />
                )}
              </React.Fragment>
            ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default EcosystemSearch;
