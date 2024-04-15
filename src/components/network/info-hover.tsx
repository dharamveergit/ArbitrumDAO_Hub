import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { paragraphCva } from "@/lib/cvas";
const InfoHover = ({ title, body }: { title?: string; body?: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <p className="text-sm font-light text-zinc-500 lg:text-base">{title}</p>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className={"text-sm text-zinc-400"}>{body}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default InfoHover;
