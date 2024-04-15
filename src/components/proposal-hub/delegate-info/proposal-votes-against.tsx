import { getWeightLabel } from "@/lib/bignumber";
import { BigNumber } from "@ethersproject/bignumber";
import type { VoteStat } from "../types/delegate-proposals";

export const ProposalVotesAgainst = ({
  voteStats,
  decimals,
}: {
  voteStats: VoteStat[];
  decimals: number;
}) => {
  const voteStatsAgainst = voteStats.find(
    ({ support }) => support.toLocaleUpperCase() === "AGAINST",
  );

  if (voteStatsAgainst === undefined) return null;

  const { percent, weight } = voteStatsAgainst;

  const w = `${percent}%`;
  const bigWeight = BigNumber.from(weight);
  const weightLabel = getWeightLabel(bigWeight, decimals);

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-[10px] font-normal text-[#E81717] md:text-sm">
        {weightLabel}
      </p>

      <div className="h-1 w-full rounded-full bg-zinc-100">
        <div style={{ width: w }} className={`flex  h-full bg-[#E81717]`}></div>
      </div>
    </div>
  );
};
