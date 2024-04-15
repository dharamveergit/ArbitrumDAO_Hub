import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTotalWeight, getWeightLabel } from "@/lib/bignumber";
import { getDateFromTimestamp, getTimestampFromIetf } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type {
  ICreatedProposals,
  StatusChange,
} from "../../types/created-proposals";
import type { DelegateData } from "../../types/delegate";
import { useDelegates } from "../../useDelegates";
import { ProposalIdentity } from "../proposal-identity";
import { ProposalVotesAgainst } from "../proposal-votes-against";
import { ProposalVotesFor } from "../proposal-votes-for";
import StatCard from "../stat-card";
export type Maybe<T> = T | null;

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

export enum SupportType {
  Abstain = "ABSTAIN",
  Against = "AGAINST",
  For = "FOR",
}

export const getGovernorProposalStatus = (proposal: {
  statusChanges?: Maybe<Array<Pick<StatusChange, "type">>>;
}): ProposalStatusType | undefined => {
  const { statusChanges } = proposal;

  if (!statusChanges) {
    return undefined;
  }

  const lastStatusChange = statusChanges[statusChanges.length - 1];

  //@ts-ignore
  return lastStatusChange.type;
};

export const ProposalsCreated = ({ address }: { address: string }) => {
  const { getCreatedProposals } = useDelegates();

  const { getDelegateByAddress } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
  });

  const createdDelegations = useQuery<ICreatedProposals, Error>({
    queryKey: ["Created_Proposals", address],
    queryFn: () => getCreatedProposals({ address: address }),
  });

  if (createdDelegations.isLoading || delegate.isLoading) {
    return <div>loading</div>;
  }

  if (createdDelegations.isError && delegate.isError) {
    return <div>error</div>;
  }

  if (createdDelegations.data && delegate.data && delegate.data.delegate) {
    if (createdDelegations.data.proposals.length === 0) {
      return <div>No proposals created</div>;
    }

    const proposalStatuses = createdDelegations.data.proposals.map(
      ({ statusChanges }) => statusChanges,
    );

    const succeededStatuses = proposalStatuses.filter((status) =>
      status.find((el) => el?.type === "SUCCEEDED"),
    );

    const cancelledStatuses = proposalStatuses.filter((status) =>
      status?.find((el) => el?.type === "CANCELED"),
    );

    // Calculate the percentage of "SUCCEEDED" statuses
    const succeededPercentage =
      (succeededStatuses.length /
        (proposalStatuses.length - cancelledStatuses.length)) *
      100;

    const percentageOrZero = isNaN(succeededPercentage)
      ? 0
      : succeededPercentage.toFixed(2);

    const { account } = delegate.data.delegate;

    return (
      <>
        <div className="grid h-[134px] w-full grid-cols-2 gap-2">
          <StatCard
            label="Proposals Created"
            value={account.proposalsCreatedCount}
            variant="LIGHT"
          />
          <StatCard
            label="Success"
            value={`${percentageOrZero}%`}
            variant="LIGHT"
          />
        </div>

        {/* Desktop */}
        <div className="mt-8 hidden lg:block">
          <Table>
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow className="border-b-0">
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Proposal
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Votes for
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Votes Against
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Total votes
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {createdDelegations.data.proposals.map((proposal, index) => {
                const status = getGovernorProposalStatus(proposal);

                const getCreatedDateLabel = () => {
                  const { block } = proposal;

                  if (!block?.timestamp) {
                    return null;
                  }

                  const { timestamp: ietfTimestamp } = block;
                  const timestamp = getTimestampFromIetf(ietfTimestamp as any);
                  const date = getDateFromTimestamp(timestamp);
                  const createdDateLabel = date.format("MMM D, YYYY");

                  return createdDateLabel;
                };

                const createdDateLabel = getCreatedDateLabel();

                const participatingVotersCount = proposal.voteStats.reduce(
                  (acc, { votes }) => {
                    return acc + Number(votes);
                  },
                  0,
                );

                const weights = proposal.voteStats
                  ? proposal.voteStats?.map(({ weight }) => weight)
                  : [];
                const totalWeight = getTotalWeight(weights);
                const totalWeightLabel = getWeightLabel(totalWeight, 18);

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <ProposalIdentity
                        organization={createdDelegations.data.organization}
                        proposal={proposal}
                      />
                    </TableCell>
                    <TableCell>
                      <ProposalVotesFor
                        decimals={18}
                        voteStats={proposal.voteStats}
                        key={proposal.id}
                      />
                    </TableCell>
                    <TableCell>
                      <ProposalVotesAgainst
                        decimals={18}
                        voteStats={proposal.voteStats}
                        key={proposal.id}
                      />
                    </TableCell>
                    <TableCell>
                      <WeightAndVoterCount
                        totalWeightLabel={totalWeightLabel}
                        participatingVotersCount={participatingVotersCount}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Tablet */}
        <div className="mt-8 hidden md:block lg:hidden">
          <Table>
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow className="border-b-0">
                <TableHead className="w-[70%]  font-os  text-sm font-medium text-zinc-400 ">
                  Proposal
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Voting Activity
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {createdDelegations.data.proposals.map((proposal, index) => {
                const status = getGovernorProposalStatus(proposal);

                const getCreatedDateLabel = () => {
                  const { block } = proposal;

                  if (!block?.timestamp) {
                    return null;
                  }

                  const { timestamp: ietfTimestamp } = block;
                  const timestamp = getTimestampFromIetf(ietfTimestamp as any);
                  const date = getDateFromTimestamp(timestamp);
                  const createdDateLabel = date.format("MMM D, YYYY");

                  return createdDateLabel;
                };

                const createdDateLabel = getCreatedDateLabel();

                const participatingVotersCount = proposal.voteStats.reduce(
                  (acc, { votes }) => {
                    return acc + Number(votes);
                  },
                  0,
                );

                const weights = proposal.voteStats
                  ? proposal.voteStats?.map(({ weight }) => weight)
                  : [];
                const totalWeight = getTotalWeight(weights);
                const totalWeightLabel = getWeightLabel(totalWeight, 18);

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <ProposalIdentity
                        organization={createdDelegations.data.organization}
                        proposal={proposal}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <WeightAndVoterCount
                          totalWeightLabel={totalWeightLabel}
                          participatingVotersCount={participatingVotersCount}
                        />

                        <div>
                          <ProposalVotesFor
                            decimals={18}
                            voteStats={proposal.voteStats}
                            key={proposal.id}
                          />
                        </div>
                        <div>
                          <ProposalVotesAgainst
                            decimals={18}
                            voteStats={proposal.voteStats}
                            key={proposal.id}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}
        <div className="mt-8  md:hidden">
          <Table>
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow className="border-b-0">
                <TableHead className="w-[100%]  font-os  text-sm font-medium text-zinc-400 ">
                  Proposal
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {createdDelegations.data.proposals.map((proposal, index) => {
                const status = getGovernorProposalStatus(proposal);

                const getCreatedDateLabel = () => {
                  const { block } = proposal;

                  if (!block?.timestamp) {
                    return null;
                  }

                  const { timestamp: ietfTimestamp } = block;
                  const timestamp = getTimestampFromIetf(ietfTimestamp as any);
                  const date = getDateFromTimestamp(timestamp);
                  const createdDateLabel = date.format("MMM D, YYYY");

                  return createdDateLabel;
                };

                const createdDateLabel = getCreatedDateLabel();

                const participatingVotersCount = proposal.voteStats.reduce(
                  (acc, { votes }) => {
                    return acc + Number(votes);
                  },
                  0,
                );

                const weights = proposal.voteStats
                  ? proposal.voteStats?.map(({ weight }) => weight)
                  : [];
                const totalWeight = getTotalWeight(weights);
                const totalWeightLabel = getWeightLabel(totalWeight, 18);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-col space-y-2">
                        <ProposalIdentity
                          organization={createdDelegations.data.organization}
                          proposal={proposal}
                        />
                        <div className="flex w-full items-center justify-between">
                          <div className="w-[30%]">
                            <ProposalVotesFor
                              decimals={18}
                              voteStats={proposal.voteStats}
                              key={proposal.id}
                            />
                          </div>
                          <div className="w-[30%]">
                            <ProposalVotesAgainst
                              decimals={18}
                              voteStats={proposal.voteStats}
                              key={proposal.id}
                            />
                          </div>

                          <WeightAndVoterCount
                            totalWeightLabel={totalWeightLabel}
                            participatingVotersCount={participatingVotersCount}
                          />
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

const WeightAndVoterCount = ({
  totalWeightLabel,
  participatingVotersCount,
}: {
  totalWeightLabel: string;
  participatingVotersCount: number;
}) => {
  return (
    <div>
      <p className="font-sans  text-xs  font-medium text-zinc-900 md:text-sm lg:text-base">
        {totalWeightLabel}
      </p>

      <p className="mt-1 font-os text-[10px]  font-normal text-zinc-900 md:text-xs lg:text-sm">
        {`${participatingVotersCount} addresses`}
      </p>
    </div>
  );
};
