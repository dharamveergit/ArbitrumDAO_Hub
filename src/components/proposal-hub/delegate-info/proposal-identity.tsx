import { getTotalWeight, getWeightLabel } from "@/lib/bignumber";
import { cn, getDateFromTimestamp, getTimestampFromIetf } from "@/lib/utils";
import truncate from "truncate";
import { ProposalStatus } from "../proposal-status/proposal-card";
import type { Organization, Proposal } from "../types/created-proposals";
import {
  ProposalStatusType,
  getGovernorProposalStatus,
} from "./tabs/proposals-created";
import { extractFirstHeading } from "./tabs/voting-power";

export const ProposalIdentity = ({
  proposal,
  organization,
}: {
  proposal: Proposal;
  organization: Organization;
}) => {
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
    <div className="flex items-start gap-x-2">
      <div className="h-[48px] w-[48px] shrink-0 lg:h-[58px] lg:w-[58px]">
        <img src={organization.metadata.icon} />
      </div>

      <div>
        <div className="flex items-center gap-x-2">
          <div>
            <p className="font-os text-xs  font-light text-zinc-900 lg:text-sm">
              {createdDateLabel}
            </p>
          </div>
          <div>
            {status && (
              <p
                className={cn(
                  "text-os rounded-full px-3 py-0.5 text-[10px] font-normal uppercase",
                  status.toLowerCase() ===
                    ProposalStatus.Executed.toLowerCase() &&
                    "bg-[#DEF7EC] text-[#035444]",
                  status.toLowerCase() ===
                    ProposalStatus.Defeated.toLowerCase() &&
                    "bg-[#FDE8E8] text-[#9B1C1C]",
                  status.toLowerCase() ===
                    ProposalStatus.Pending.toLowerCase() &&
                    "bg-[#EDEBFE] text-[#5521BC]",
                  status.toLowerCase() ===
                    ProposalStatus.Active.toLowerCase() &&
                    "bg-[#E1EFFE] text-[#30429F]",
                  status.toLowerCase() ===
                    ProposalStatus.Closed.toLowerCase() &&
                    "bg-[#FDE8E8] text-[#9B1C1C]",
                  status.toLowerCase() ===
                    ProposalStatus.Succeeded.toLowerCase() &&
                    "bg-[#DEF7EC] text-[#035444]",
                  status.toLowerCase() ===
                    ProposalStatus.Queued.toLowerCase() &&
                    "bg-[#FDE8E8] text-[#9B1C1C]",
                )}
              >
                {status}
              </p>
            )}
          </div>
        </div>

        <div className="mt-2">
          <p className="hidden font-sans  text-sm  font-medium md:block lg:text-base">
            {truncate(extractFirstHeading(proposal.description), 50)}
          </p>

          <p className="font-sans text-sm  font-medium md:hidden lg:text-base">
            {truncate(extractFirstHeading(proposal.description), 100)}
          </p>
        </div>
      </div>
    </div>
  );
};
