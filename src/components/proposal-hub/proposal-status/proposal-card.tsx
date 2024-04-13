import Button from "@/components/ui/button";
import { proseClasses } from "@/lib/classes";
import { buttonVariants } from "@/lib/cvas";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Markdown from "react-markdown";

type CTA = {
  label: string;
  link: string;
};

export enum ProposalStatus {
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
  /** Proposal has closed */
  Closed = "CLOSED",
}

export const ProposalCard = ({
  title,
  date,
  body,
  type,
  proposalId,
  cta,
  status,
  domain,
}: {
  title: string;
  date: string;
  body?: any;
  type: "TALLY" | "SNAPSHOT" | "FORUM";
  proposalId: string;
  cta?: CTA;
  status?: string;
  domain?: string;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex justify-between border-b pb-4">
        <div className="flex items-center justify-between gap-x-4">
          {domain && (
            <p className="font-sans text-xs font-light  text-[#4A4A4A] md:text-sm lg:text-base">
              {domain}
            </p>
          )}

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
                status.toLowerCase() === ProposalStatus.Pending.toLowerCase() &&
                  "bg-[#EDEBFE] text-[#5521BC]",
                status.toLowerCase() === ProposalStatus.Active.toLowerCase() &&
                  "bg-[#E1EFFE] text-[#30429F]",
                status.toLowerCase() === ProposalStatus.Closed.toLowerCase() &&
                  "bg-[#FDE8E8] text-[#9B1C1C]",
              )}
            >
              {status}
            </p>
          )}
        </div>

        <p className="font-sans text-xs font-light  text-black md:text-sm lg:text-base">
          {date}
        </p>
      </div>

      <div className="mt-2">
        <h3 className="mt-2 font-sans text-base font-medium   text-zinc-900 md:text-xl lg:text-2xl">
          {title}
        </h3>

        <div className="mt-2">
          <Markdown className={proseClasses}>
            {body.length > 300 ? (showFullContent ? body : "") : body}
          </Markdown>

          {body.length > 300 && (
            <div>
              <button
                onClick={toggleContent}
                className={buttonVariants({
                  variant: "link",
                  size: "link",
                })}
              >
                {showFullContent ? "Show less" : "Read more"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        {cta && (
          <div>
            <div className="hidden md:block">
              <Button arrow variant="outline" href={cta.link}>
                {cta.label}
              </Button>
            </div>
            <div className="md:hidden ">
              <Button arrow variant="outline" size="sm" href={cta.link}>
                {cta.label}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
