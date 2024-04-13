import { useQuery } from "@tanstack/react-query";
import React from "react";
import { arbAbi } from "./miltisig";
import { Skeleton } from "../ui/skeleton";

const Signers = ({ address }: { address: string }) => {
  const {
    data: signers,
    status: signersStatus,
    error: signersError,
  } = useQuery({
    queryFn: async () => {
      const res = await fetch(`${arbAbi}/${address}`);
      return res.json();
    },
    queryKey: ["signers", address],
  });
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-sm font-medium lg:text-base">
        Signers : {signers?.threshold ?? 0}/{signers?.owners?.length ?? 0}
      </h1>
      <div className="flex flex-col gap-4">
        {!signers &&
          new Array(5).fill(0).map((_, index) => (
            <div className="flex items-center gap-2 " key={index}>
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-3 w-40 " />
            </div>
          ))}
        {signers?.owners?.map((item: any) => (
          <div key={item} className="flex items-center gap-2 ">
            <Svg />
            <h2 className="text-sm font-medium text-zinc-700  lg:text-base ">
              {item.slice(0, 6) + "..." + item.slice(-4)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signers;

const Svg = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill="url(#paint0_linear_2260_59390)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2260_59390"
          x1="20"
          y1="0"
          x2="20"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#78DBF6" />
          <stop offset="1" stop-color="#EEFBFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
