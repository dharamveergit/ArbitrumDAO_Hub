import { useQuery } from "@tanstack/react-query";
import type { IGetAllProposalsQuery } from "../types/get-all-proposals";
import { useProposals } from "../useProposals";

export const ProposalStats = () => {
  const { getAllProposals } = useProposals();

  const proposalStats = useQuery<IGetAllProposalsQuery, Error>({
    queryKey: ["proposals-stats"],
    queryFn: () => getAllProposals({ offset: 0 }),
  });

  if (proposalStats.isLoading) {
    return <div> Loading</div>;
  }

  if (proposalStats.data) {
    const { governors } = proposalStats.data;

    const passedProposalsCount = governors.reduce((currentTotal, governor) => {
      return currentTotal + governor.proposalStats.passed;
    }, 0);

    const failedProposalsCount = governors.reduce((currentTotal, governor) => {
      return currentTotal + governor.proposalStats.failed;
    }, 0);

    return (
      <div className="flex gap-x-5">
        <h3 className="font-sans  text-sm  font-medium  text-zinc-400 md:text-lg lg:text-xl">
          Failed <span className="text-[#EE0000]">{failedProposalsCount}</span>
        </h3>
        <h3 className="font-sans  text-sm  font-medium  text-zinc-400 md:text-lg lg:text-xl">
          Passed <span className="text-[#009821]">{passedProposalsCount} </span>
        </h3>
      </div>
    );
  }
};
