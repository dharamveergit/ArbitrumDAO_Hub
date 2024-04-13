import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Skeleton } from "@/components/ui/skeleton";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import type { DelegatesData } from "../types/delegates";
import { useDelegates, type SortBy } from "../useDelegates";
import { DelegatesInfoCard } from "./delegate-info-card";

export function DelegateSearch({ sortBy }: { sortBy: SortBy }) {
  const { getDelegates } = useDelegates();

  const delegatesData = useInfiniteQuery<DelegatesData, Error>({
    queryKey: ["DELEGATES", sortBy],
    queryFn: ({ pageParam = 0 }) =>
      getDelegates({ sortBy: sortBy, afterCursor: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.delegates.pageInfo.lastCursor
        ? lastPage.delegates.pageInfo.lastCursor
        : undefined;
    },
    initialPageParam: undefined, // Add initialPageParam
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (delegatesData.isError) {
    return <div>{delegatesData.error.message}</div>;
  }

  if (delegatesData.isLoading) {
    return <Skeleton className="h-[60px] w-[35rem] max-w-full rounded-full" />;
  }

  if (delegatesData.data && delegatesData.data.pages[0].delegates) {
    return (
      <>
        <button
          onClick={() => setOpen((open: boolean) => !open)}
          className="flex h-[60px] w-[35rem] max-w-full items-center justify-between  rounded-full border border-zinc-200 px-5 py-2 md:py-2.5"
        >
          <div className="flex items-center">
            <Search
              className="size-4 stroke-[1.3] text-zinc-500  md:size-5"
              aria-label="Search blog posts "
            />
            <p className=" ml-2  text-sm font-light text-zinc-300 lg:text-base">
              Exact ENS or address
            </p>
          </div>

          <kbd className="pointer-events-none hidden h-5  select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 md:inline-flex md:text-sm">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type Exact ENS or address..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Delegates">
              {delegatesData.data.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.delegates.nodes.map((delegate, i) => {
                    return (
                      <CommandItem key={i}>
                        <DelegatesInfoCard
                          cardType="SEARCH"
                          decimals={
                            delegatesData.data.pages[0].governance.tokens[0]
                              .decimals
                          }
                          delegate={delegate}
                          userName={delegate.account.name}
                          avatar={delegate.account.picture}
                          description={
                            delegate.statementV2?.statementSummary
                              ? delegate.statementV2.statementSummary
                              : ""
                          }
                          twitterUsername={delegate.account.twitter}
                          address={delegate.account.address}
                          arb={delegate.votesCount}
                          api={delegatesData.data.pages[0].api}
                        />
                      </CommandItem>
                    );
                  })}
                </React.Fragment>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  }
}
