import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/lib/cvas";
import ReactQueryContext from "@/lib/react-query-context";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import type { DelegatesData } from "../types/delegates";
import { useDelegates, type SortBy } from "../useDelegates";
import { DelegatesInfoCard } from "./delegate-info-card";
import { DelegateSearch } from "./delegate-search";
import { useTokenStats } from "./useTokenStats";

const Index = () => {
  return (
    <ReactQueryContext>
      <DelegatesSection />
    </ReactQueryContext>
  );
};

export default Index;

const DelegatesSection = () => {
  const [sortBy, setSortBy] = useState<SortBy>("VOTES");

  return (
    <div className="flex w-full justify-between">
      <div className="w-full">
        <h3 className="text-xl  font-medium md:text-2xl">Delegates</h3>

        {/* Stats */}
        <TokenStatsGrid />

        {/* Delegates */}
        <DelegatesGrid sortBy={sortBy} />
      </div>
      <div className="ml-6 hidden w-[333px]  lg:block">
        <DelegateSearch sortBy={sortBy} />

        <div className="mt-3">
          <button className="flex w-full border-b px-5 py-5 text-xl font-medium">
            All Delegates
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full justify-start border-b px-5 py-5 text-start text-xl font-medium">
              Sort By: {sortBy === "VOTES" && "Voting Powers"}{" "}
              {sortBy === "DELEGATORS" && "Received Delegations"}{" "}
              {sortBy === "RANDOM" && "Random"}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="space-y-2  rounded-2xl px-4 py-6"
            >
              <DropdownMenuItem
                onClick={() => setSortBy("VOTES")}
                className="cursor-pointer rounded-lg p-2 text-sm font-medium"
              >
                Votiong Power
              </DropdownMenuItem>
              <div className="w-full border-b"></div>
              <DropdownMenuItem
                onClick={() => setSortBy("DELEGATORS")}
                className="cursor-pointer rounded-lg p-2 text-sm font-medium"
              >
                Received Delegations
              </DropdownMenuItem>
              <div className="w-full border-b"></div>
              <DropdownMenuItem
                onClick={() => setSortBy("RANDOM")}
                className="cursor-pointer rounded-lg p-2 text-sm font-medium"
              >
                Random
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const TokenStatsGrid = () => {
  const { getTokenStatsQuery, formatStats } = useTokenStats();
  // do not remove below line
  getTokenStatsQuery.isFetching;

  if (getTokenStatsQuery.isLoading) {
    return (
      <div className="mt-2 flex  h-[82px] w-full  grid-cols-4 gap-4  overflow-x-scroll  md:mt-4 md:grid  md:h-[116px] md:w-[558px] md:overflow-hidden  lg:mt-8 lg:h-[134px] lg:w-[638px] lg:gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton
            key={i}
            className="flex  h-full w-[89px] shrink-0 flex-col justify-end rounded-2xl p-2.5 md:w-[116px]  lg:w-[146px]"
          />
        ))}
      </div>
    );
  }

  if (getTokenStatsQuery.isError) {
    return <div>{getTokenStatsQuery.error.message}</div>;
  }

  if (getTokenStatsQuery.data && getTokenStatsQuery.data.governance) {
    const { quorum, delegatedTokens, proposalThreshold, totalSupply } =
      formatStats({ governance: getTokenStatsQuery.data.governance });

    return (
      <div className=" mt-2 flex  h-[82px] w-full  grid-cols-4 gap-4  overflow-x-scroll md:mt-4  md:grid  md:h-[116px] md:w-[558px] md:overflow-hidden  lg:mt-8 lg:h-[134px] lg:w-[638px] lg:gap-4">
        <div
          className={`flex  h-full w-[89px]  shrink-0 flex-col  justify-end rounded-2xl bg-[#F5CDFF]  p-2.5  md:w-[116px] lg:w-[146px]`}
        >
          <div>
            <p className="text-lg font-medium md:text-2xl   lg:text-3xl">
              {totalSupply}
            </p>
            <p className="mt-0.5 text-[10px] font-normal md:text-xs lg:text-sm">
              Total Supply
            </p>
          </div>
        </div>

        <div
          className={`flex  h-full w-[89px] flex-col justify-end  rounded-2xl bg-[#C5D5FB] p-2.5  md:w-[116px]  lg:w-[146px]`}
        >
          <div>
            <p className="text-lg font-medium md:text-2xl lg:text-3xl">
              {delegatedTokens}
            </p>
            <p className="mt-0.5 text-[10px] font-normal md:text-xs lg:text-sm">
              Delegated Tokens
            </p>
          </div>
        </div>

        <div
          className={`flex  h-full w-[89px] shrink-0 flex-col justify-end  rounded-2xl bg-[#ABE9F4] p-2.5  md:w-[116px]  lg:w-[146px]`}
        >
          <div>
            <p className="text-lg font-medium md:text-2xl lg:text-3xl">
              {quorum}
            </p>
            <p className="mt-0.5 text-[10px] font-normal md:text-xs lg:text-sm">
              Quorum
            </p>
          </div>
        </div>

        <div
          className={`flex  h-full w-[89px] shrink-0  flex-col justify-end  rounded-2xl bg-[#18181B] p-2.5  md:w-[116px]  lg:w-[146px]`}
        >
          <div className="text-white">
            <p className="text-lg font-medium md:text-2xl lg:text-3xl">
              {proposalThreshold}
            </p>
            <p className="mt-0.5 text-[10px] font-normal md:text-xs lg:text-sm">
              Proposal Threshold
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const DelegatesGrid = ({ sortBy }: { sortBy: SortBy }) => {
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

  if (delegatesData.isError) {
    return <div>{delegatesData.error.message}</div>;
  }

  if (delegatesData.isLoading) {
    return (
      <div className="mt-5  grid  w-full   grid-cols-1 gap-4  md:mt-9 md:grid-cols-2  lg:mt-12 lg:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <DelegatesInfoCard.skeleton key={i} />
        ))}
      </div>
    );
  }

  if (delegatesData.data && delegatesData.data.pages[0].delegates) {
    if (delegatesData.data.pages[0].delegates.nodes.length === 0) {
      return <div>no delegates found</div>;
    }

    return (
      <div>
        <div className=" mt-5  grid  w-full   grid-cols-1 gap-4  md:mt-9 md:grid-cols-2  lg:mt-12 lg:grid-cols-2">
          {delegatesData.data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.delegates.nodes.map((delegate, i) => {
                return (
                  <DelegatesInfoCard
                    key={i}
                    decimals={
                      delegatesData.data.pages[0].governance.tokens[0].decimals
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
                    cardType="FULL"
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {delegatesData.hasNextPage && (
          <div className="mt-5">
            <button
              onClick={() => delegatesData.fetchNextPage()}
              className={buttonVariants({
                variant: "outline",
                size: "default",
              })}
            >
              {delegatesData.isFetchingNextPage ? "Loading..." : "Load more"}
            </button>{" "}
          </div>
        )}
      </div>
    );
  }

  return null;
};
