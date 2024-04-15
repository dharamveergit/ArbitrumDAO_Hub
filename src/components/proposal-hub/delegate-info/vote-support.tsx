import {
  AlertCircle,
  Ban,
  CheckCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import React from "react";
import { ParticipationType } from "../types/delegate-proposals";

export const VoteSupport = ({
  participationType,
}: {
  participationType: ParticipationType;
}) => {
  if (participationType === ParticipationType.Notvoted) {
    return (
      <p className="flex w-fit items-center gap-x-2 rounded-lg bg-[#F3F4F6] p-1  font-os text-[10px] font-normal text-[#1F2937] md:text-sm ">
        <Ban className="  h-[14px] w-[14px] md:h-[20px] md:w-[20px]" />
        No Vote
      </p>
    );
  }

  if (participationType === ParticipationType.Votedagainst) {
    return (
      <p className="flex w-fit items-center gap-x-2 rounded-lg bg-[#FDE8E8] p-1    font-os text-[10px] font-normal text-[#9B1C1C] md:text-sm">
        <XCircle className="  h-[14px] w-[14px] md:h-[20px] md:w-[20px]" />
        Voted Against
      </p>
    );
  }

  if (participationType === ParticipationType.Votedfor) {
    return (
      <p className="flex  w-fit items-center gap-x-2 rounded-lg bg-[#DEF7EC] p-1  font-os text-[10px] font-normal text-[#03543F] md:text-sm">
        <CheckCircle2 className="  h-[14px] w-[14px] md:h-[20px] md:w-[20px]" />
        Voted For
      </p>
    );
  }

  if (participationType === ParticipationType.VotedAbstain) {
    return (
      <p className="flex  w-fit items-center gap-x-2 rounded-lg bg-[#EDEBFE] p-1  font-os text-[10px] font-normal text-[#5521BC] md:text-sm">
        <AlertCircle className="  h-[14px] w-[14px] md:h-[20px] md:w-[20px]" />
        Voted Abstain
      </p>
    );
  }

  return (
    <p className="flex  w-fit items-center gap-x-2 rounded-lg bg-[#DEF7EC] p-1  font-os text-[10px] font-normal text-[#03543F] md:text-sm">
      <AlertCircle className="  h-[14px] w-[14px] md:h-[20px] md:w-[20px]" />
      {participationType}
    </p>
  );
};
