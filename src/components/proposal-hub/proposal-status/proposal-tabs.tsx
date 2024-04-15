import Button from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roundedNavButtonClass } from "@/lib/cvas";
import ReactQueryContext from "@/lib/react-query-context";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React from "react";
import type { IGetAllProposalsQuery } from "../types/get-all-proposals";
import { useProposals } from "../useProposals";
import { ProposalForum } from "./proposal-forum";
import { ProposalStats } from "./proposal-stats";
import { ProposalsOffChain } from "./proposals-off-chain";
import { ProposalsOnChain } from "./proposals-on-chain";

interface props {
  size?: "default" | "large";
}

const Index = ({}: {}) => {
  return (
    <ReactQueryContext>
      <ProposalTabs />
    </ReactQueryContext>
  );
};

export default Index;

const ProposalTabs = ({ size = "large" }: props) => {
  return (
    <Tabs defaultValue={"1"} className="flex flex-col gap-3 lg:gap-4 ">
      <TabsList className="flex h-auto   justify-between gap-2 overflow-x-auto bg-white p-0">
        <div className="flex gap-2">
          <TabsTrigger
            value={"1"}
            className="p-0 data-[state=active]:text-white [&[data-state=active]>div]:bg-secondary"
          >
            <div
              className={classNames(
                roundedNavButtonClass({ variant: "children", size: size }),
                " flex  justify-start",
              )}
            >
              {"On-Chain Proposals"}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value={"2"}
            className="p-0 data-[state=active]:text-white [&[data-state=active]>div]:bg-secondary"
          >
            <div
              className={classNames(
                roundedNavButtonClass({ variant: "children", size: size }),
                " flex  justify-start",
              )}
            >
              {"Off-Chain Proposals"}
            </div>
          </TabsTrigger>
          {/* <TabsTrigger
            value={"3"}
            className="p-0 data-[state=active]:text-white [&[data-state=active]>div]:bg-secondary"
          >
            <div
              className={classNames(
                roundedNavButtonClass({ variant: "children", size: size }),
                " flex  justify-start",
              )}
            >
              {"Forum"}
            </div>
          </TabsTrigger> */}
        </div>

        <div className="mt-2 hidden w-full shrink-0 justify-end  gap-x-5 lg:mt-0   lg:block lg:w-fit lg:items-center">
          <ProposalStats />
        </div>
      </TabsList>

      <div className="mt-2 flex w-full  shrink-0   justify-start  gap-x-5 md:justify-end   lg:mt-0 lg:hidden    lg:w-fit lg:items-center">
        <ProposalStats />
      </div>

      <TabsContent value={"1"} className="mt-0">
        <ProposalsOnChain />
      </TabsContent>
      <TabsContent value={"2"} className="mt-0">
        <ProposalsOffChain />
      </TabsContent>
      <TabsContent value={"3"} className="mt-0">
        <ProposalForum />
      </TabsContent>
    </Tabs>
  );
};

{
  /* <div className="mt-2 flex w-full shrink-0  justify-end gap-x-5 lg:mt-0  lg:w-fit lg:items-center">
<ProposalStats />
</div> */
}
