import Button from "@/components/ui/button";
import { buttonVariants } from "@/lib/cvas";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import flatten from "lodash.flatten";
import React from "react";
import {
  getGovernorProposalStatus,
  type Maybe,
} from "../delegate-info/tabs/proposals-created";
import type { StatusChange } from "../types/created-proposals";
import type { IGetAllProposalsQuery } from "../types/get-all-proposals";
import { useProposals } from "../useProposals";
import { ProposalCard } from "./proposal-card";

export enum ProposalStatusType {
  /** Voting is in progress. */
  Active = "ACTIVE",
  /** Proposal has been canceled.  This is a final status. */
  Canceled = "CANCELED",
  /** Proposal has been defeated.  This proposal cannot be queued or excuted.  This is a final status. */
  Defeated = "DEFEATED",
  /** Proposal has been executed.  This is a final status. */
  Executed = "EXECUTED",
  /** Proposal has expired.  This is a final status. */
  Expired = "EXPIRED",
  /** Proposal has been created, but voting has not started.  An address can still accumulate voting power. */
  Pending = "PENDING",
  /** Proposal has queued into a timelock.  This proposal can be excuted. */
  Queued = "QUEUED",
  /** Proposal has succeeded, it can now be queued or executed. */
  Succeeded = "SUCCEEDED",
}

export const getLastProposalStatus = (proposal: {
  statusChanges?: Maybe<Array<StatusChange>>;
}): StatusChange | undefined => {
  const { statusChanges } = proposal;

  if (!statusChanges) {
    return undefined;
  }

  const lastStatusChange = statusChanges[statusChanges.length - 1];

  return lastStatusChange;
};

function formatDate(date: Date) {
  const months = [
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

  // Extract day, month, and year
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${day} ${months[monthIndex]}, ${year}`;

  return formattedDate;
}

export function extractFirstHeading(markdown: string): string {
  const headingRegex = /^(#+)\s+(.+)/; // Regex to match the first heading
  const match = markdown.match(headingRegex);
  if (match && match[2]) {
    const headingText = match[2];
    return headingText; // Return only the text of the first heading
  } else {
    return ""; // Return an empty string if no heading is found
  }
}

export function removeFirstHeading(markdown: string): string {
  const headingRegex = /^(#+)\s+.+\n/; // Regex to match the first heading
  const updatedMarkdown = markdown.replace(headingRegex, ""); // Remove the first heading
  return updatedMarkdown;
}

export const ProposalsOnChain = () => {
  const { getAllProposals } = useProposals();

  const proposals = useInfiniteQuery<IGetAllProposalsQuery, Error>({
    queryKey: ["proposals"],
    queryFn: ({ pageParam = 0 }) =>
      getAllProposals({ offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      const proposalsCount = lastPage.proposals.length;

      // Return the new offset for the next page
      return proposalsCount > 0 ? allPages.length * 10 : undefined;
    },
    initialPageParam: undefined, // Add initialPageParam
  });

  if (proposals.isLoading) {
    return <div>loading...</div>;
  }

  if (proposals.data) {
    const allProposals = proposals.data.pages
      .map((page) => page?.proposals)
      .filter((proposal) => proposal !== undefined);

    const newproposals = flatten(allProposals);

    function arbitrumCompareFn(proposalA: any, proposalB: any): number {
      const statusA = getLastProposalStatus(proposalA)?.type || "";

      const statusB = getLastProposalStatus(proposalB)?.type || "";

      if (
        statusA === ProposalStatusType.Active &&
        statusB !== ProposalStatusType.Active
      ) {
        return -1;
      } else if (
        statusA !== ProposalStatusType.Active &&
        statusB === ProposalStatusType.Active
      ) {
        return 1;
      } else {
        const timestampA = new Date(proposalA.block.timestamp).getTime();
        const timestampB = new Date(proposalB.block.timestamp).getTime();

        return timestampB - timestampA;
      }
    }

    const arbitrumProposals = newproposals.sort(arbitrumCompareFn);

    return (
      <div className="custom-scrollbar mt-4 flex max-h-[1000px] flex-col gap-y-5 overflow-y-scroll rounded-xl border-[5px] bg-zinc-50 p-5">
        {proposals.data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {arbitrumProposals.map((proposal) => {
              const cta = {
                label: "Tally",
                link: `https://www.tally.xyz/gov/arbitrum/proposal/${proposal.id}`,
              };

              const proposalDate = new Date(proposal.block.timestamp);
              const formattedDate = formatDate(proposalDate);

              const status = getGovernorProposalStatus(proposal);

              return (
                <ProposalCard
                  domain={proposal.governance.name}
                  status={status as string}
                  key={proposal.id}
                  title={extractFirstHeading(proposal.description)}
                  date={formattedDate}
                  body={removeFirstHeading(proposal.description)}
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
