import { buttonVariants } from "@/lib/cvas";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import type { IGetAllOffChainProposals } from "../types/get-all-offchain-proposals";
import { useProposals } from "../useProposals";
import { ProposalCard } from "./proposal-card";

function formatUnixTimestamp(timestamp: number): string {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export const ProposalsOffChain = () => {
  const { getAllOffChainProposals } = useProposals();

  const proposals = useInfiniteQuery<IGetAllOffChainProposals, Error>({
    queryKey: ["proposals-off-chain"],
    queryFn: ({ pageParam = 0 }) =>
      getAllOffChainProposals({ skip: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 1) {
        return 6; // Return 6 for the first page
      }

      const proposalsCount = lastPage.proposals.length;

      // Return the new offset for the next page
      return proposalsCount + 6;
    },
    initialPageParam: undefined, // Add initialPageParam
  });

  if (proposals.isLoading) {
    return <div>loading...</div>;
  }

  if (proposals.isError) {
    return <div>{proposals.error.message}</div>;
  }

  if (proposals.data) {
    return (
      <div className="custom-scrollbar mt-4 flex max-h-[1000px] flex-col gap-y-5 overflow-y-scroll rounded-xl border-[5px] bg-zinc-50 p-5">
        {proposals.data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.proposals.map((proposal) => {
              console.log(proposal);

              const cta = {
                label: "Snapshot",
                link: `https://snapshot.org/#/arbitrumfoundation.eth/proposal/${proposal.id}`,
              };

              return (
                <ProposalCard
                  domain={proposal.symbol}
                  status={proposal.state}
                  key={proposal.id}
                  title={proposal.title}
                  date={formatUnixTimestamp(proposal.created)}
                  body={proposal.body}
                  type="SNAPSHOT"
                  proposalId={proposal.id}
                  cta={cta}
                />
              );
            })}
          </React.Fragment>
        ))}

        {proposals.hasNextPage && (
          <button
            onClick={() => proposals.fetchNextPage()}
            className={buttonVariants({
              variant: "outline",
              size: "default",
            })}
          >
            {proposals.isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    );
  }
};
