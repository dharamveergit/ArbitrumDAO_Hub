import { getWeightLabel } from "@/lib/bignumber";
import { BigNumber } from "@ethersproject/bignumber";
import type { VoteStat } from "../types/delegate-proposals";

export const ProposalVotesFor = ({
  voteStats,
  decimals,
}: {
  voteStats: VoteStat[];
  decimals: number;
}) => {
  const voteStatsFor = voteStats?.find(
    ({ support }) => support.toLocaleUpperCase() === "FOR",
  );

  if (voteStatsFor === undefined) return null;

  const w = `${voteStatsFor?.percent}%`;
  const bigWeight = BigNumber.from(voteStatsFor?.weight);

  const weightLabel = getWeightLabel(bigWeight, decimals);

  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-[10px]  font-normal text-[#23C57A] md:text-sm">
        {weightLabel}
      </p>

      <div className="h-1 w-full rounded-full bg-zinc-100">
        <div style={{ width: w }} className={` h-full bg-[#23C57A]`}></div>
      </div>
    </div>
  );
};
