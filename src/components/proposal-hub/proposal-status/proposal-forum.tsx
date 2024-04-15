import { getCollection } from "astro:content";
import { ProposalCard } from "./proposal-card";

const proposals = await getCollection("Proposal_Hub_Forum");

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

export const ProposalForum = () => {
  console.log(proposals);

  if (proposals.length === 0) {
    return <p>no proposals found</p>;
  }

  return (
    <div className="custom-scrollbar mt-4 flex max-h-[1000px] flex-col gap-y-5 overflow-y-scroll rounded-xl border-[5px] bg-zinc-50 p-5">
      {proposals.map((proposal, index) => {
        let cta;
        if (proposal.data.cta) {
          cta = {
            label: proposal.data.cta.label,
            link: proposal.data.cta.link,
          };
        } else {
          cta: undefined;
        }

        return (
          <ProposalCard
            domain={proposal.data.domain}
            status={proposal.data.status}
            title={proposal.data.title}
            date={formatDate(proposal.data.createdAt)}
            body={proposal.data.description}
            type="FORUM"
            proposalId={proposal.id}
            key={proposal.id}
            cta={cta}
          />
        );
      })}
    </div>
  );
};
