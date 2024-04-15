import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWeightLabel } from "@/lib/bignumber";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { BigNumber } from "@ethersproject/bignumber";
import { useQuery } from "@tanstack/react-query";
import ClassicBigNumber from "bignumber.js";
import Markdown from "react-markdown";
import type { Organization } from "../../types/created-proposals";
import type { DelegateData } from "../../types/delegate";
import type {
  DelegateProposals,
  Proposal,
} from "../../types/delegate-proposals";
import { useDelegates } from "../../useDelegates";
import { ProposalIdentity } from "../proposal-identity";
import { ProposalVotesAgainst } from "../proposal-votes-against";
import { ProposalVotesFor } from "../proposal-votes-for";
import StatCard from "../stat-card";
import { VoteSupport } from "../vote-support";

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

export const VotingPower = ({ address }: { address: string }) => {
  const { getDelegateByAddress, getAddressDAOSProposals } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
  });

  const delegateProposals = useQuery<DelegateProposals, Error>({
    queryKey: ["DELEGATE_PROPOSALS", address],
    queryFn: () => getAddressDAOSProposals({ address: address }),
  });

  if (delegate.isLoading || delegateProposals.isLoading) {
    return <div>loading</div>;
  }

  if (delegate.isError || delegateProposals.isError) {
    return <div>error</div>;
  }

  if (delegate.data && delegateProposals.data) {
    const { votesCount } = delegate.data.delegate;

    const decimals = delegate.data.delegate.token.decimals;
    const weight = votesCount;
    const bigWeight = weight ? BigNumber.from(weight) : "";
    const weightLabel = getWeightLabel(bigWeight, decimals || 0);

    const { quorum } = delegate.data.governorsV2.nodes[0];

    const percentOfQuorum =
      quorum !== "0" && weight
        ? new ClassicBigNumber(weight)
            .dividedBy(new ClassicBigNumber(quorum || 0))
            .times(100)
            .toFixed(2)
        : null;

    const votingPowerLabel = `Voting Power ${percentOfQuorum && `${percentOfQuorum}% of Quorum`}`;

    return (
      <>
        <div className="h-[134px] max-w-[300px]">
          <StatCard
            variant="DARK"
            label={votingPowerLabel}
            value={weightLabel}
          />
        </div>

        {/* Desktop */}
        <div className="mt-8 hidden lg:block">
          <Table className="w-full ">
            <TableHeader className="  bg-[#F0F9FF]">
              <TableRow className="border-b-0">
                <TableHead className="font-os text-sm font-medium text-zinc-400">
                  Proposal
                </TableHead>
                <TableHead className="w-[200px] font-os text-sm font-medium text-zinc-400">
                  Voted?
                </TableHead>
                <TableHead className="w-[150px] font-os text-sm font-medium text-zinc-400">
                  Votes for
                </TableHead>
                <TableHead className="w-[150px] font-os text-sm font-medium text-zinc-400">
                  Votes Against
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {delegateProposals.data.proposals && (
                <>
                  {delegateProposals.data.proposals.map((proposal) => {
                    return (
                      <TableRow key={proposal.id}>
                        <TableCell>
                          <ProposalIdentity
                            organization={delegate.data.organization}
                            proposal={proposal}
                          />
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://www.tally.xyz/gov/arbitrum/proposal/${proposal.id}`}
                            target="_blank"
                          >
                            <VoteSupport
                              participationType={proposal.participationType}
                            />
                          </a>
                        </TableCell>
                        <TableCell>
                          <ProposalVotesFor
                            voteStats={proposal.voteStats}
                            decimals={decimals}
                          />
                        </TableCell>
                        <TableCell>
                          <ProposalVotesAgainst
                            voteStats={proposal.voteStats}
                            decimals={decimals}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Tablet  */}
        <div className="mt-8 hidden md:block lg:hidden">
          <Table className="w-full ">
            <TableHeader className="  bg-[#F0F9FF]">
              <TableRow className="border-b-0">
                <TableHead className="w-[70%]  font-os text-sm font-medium text-zinc-400">
                  Proposal
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400">
                  Voting Activity
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {delegateProposals.data.proposals.map((proposal) => {
                return (
                  <TableRow key={proposal.id}>
                    <TableCell>
                      <ProposalIdentity
                        organization={delegate.data.organization}
                        proposal={proposal}
                      />
                    </TableCell>
                    <TableCell className="space-y-2">
                      <a
                        href={`https://www.tally.xyz/gov/arbitrum/proposal/${proposal.id}`}
                        target="_blank"
                      >
                        <VoteSupport
                          participationType={proposal.participationType}
                        />
                      </a>
                      <ProposalVotesFor
                        voteStats={proposal.voteStats}
                        decimals={decimals}
                      />
                      <ProposalVotesAgainst
                        voteStats={proposal.voteStats}
                        decimals={decimals}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}
        <div className="mt-8 block md:hidden">
          <Table className="w-full ">
            <TableHeader className="  bg-[#F0F9FF]">
              <TableRow className="border-b-0">
                <TableHead className="w-full  font-os text-sm font-medium text-zinc-400">
                  Proposal
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {delegateProposals.data.proposals.map((proposal) => {
                return (
                  <TableRow key={proposal.id}>
                    <TableCell>
                      <div className="flex flex-col ">
                        <div>
                          <ProposalIdentity
                            organization={delegate.data.organization}
                            proposal={proposal}
                          />
                        </div>
                        <div className="mt-7 flex w-full items-center justify-between">
                          <a
                            href={`https://www.tally.xyz/gov/arbitrum/proposal/${proposal.id}`}
                            target="_blank"
                          >
                            <VoteSupport
                              participationType={proposal.participationType}
                            />
                          </a>
                          <div className="w-[30%]">
                            <ProposalVotesFor
                              voteStats={proposal.voteStats}
                              decimals={decimals}
                            />
                          </div>

                          <div className="w-[30%]">
                            <ProposalVotesAgainst
                              voteStats={proposal.voteStats}
                              decimals={decimals}
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
};
