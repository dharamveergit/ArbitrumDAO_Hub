import ReactQueryContext from "@/lib/react-query-context";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AccountOverView from "./account-overview";
import About from "./tabs/about";
import GoalsForTheDAO from "./tabs/goals-for-the-dao";
import { ProposalsCreated } from "./tabs/proposals-created";
import { ReceivedDelegations } from "./tabs/received-delegations";
import { VotingPower } from "./tabs/voting-power";

const Index = ({
  address,
  api,
}: {
  address: string;
  api: "TALLY" | "SNAPSHOT";
}) => {
  return (
    <ReactQueryContext>
      <DelegateSection address={address} api={api} />
    </ReactQueryContext>
  );
};

export default Index;

const DelegateSection = ({
  address,
  api,
}: {
  address: string;
  api: "TALLY" | "SNAPSHOT";
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <div className="lg:pb-10">
        <AccountOverView address={address} />
      </div>

      <div className="my-10 h-px w-full bg-zinc-200" id={"1"}></div>

      <div className="hidden overflow-hidden   pt-10 md:block">
        <div className=" w-full rounded-[32px] border-[4px] p-4">
          <div className="flex h-full w-full gap-x-5">
            <div className=" w-[258px] shrink-0 rounded-[20px] bg-[#F0F9FF] px-2 py-3">
              <div className="flex flex-col items-start justify-start ">
                <h3 className="mx-2 px-2 py-4 text-xl  font-medium">About</h3>

                <div className="w-full border-b"></div>

                <button
                  onClick={() => setCurrentTab(0)}
                  className={cn(
                    "mx-2 px-4 py-4 font-os text-base  text-[#3F3F46]  hover:text-zinc-900",
                    currentTab === 0
                      ? "font-normal text-zinc-900"
                      : "font-light",
                  )}
                >
                  About
                </button>

                <div className="w-full border-b"></div>

                <button
                  onClick={() => setCurrentTab(1)}
                  className={cn(
                    "mx-2 px-4 py-4 font-os text-base  text-[#3F3F46]  hover:text-zinc-900",
                    currentTab === 1
                      ? "font-normal text-zinc-900"
                      : "font-light",
                  )}
                >
                  Goals for DAO
                </button>

                <div className="w-full border-b"></div>

                <button
                  onClick={() => setCurrentTab(2)}
                  className={cn(
                    "mx-2 px-4 py-4 font-os text-base  text-[#3F3F46]  hover:text-zinc-900",
                    currentTab === 2
                      ? "font-normal text-zinc-900"
                      : "font-light",
                  )}
                >
                  Voting Power
                </button>

                <div className="w-full border-b"></div>

                <button
                  onClick={() => setCurrentTab(3)}
                  className={cn(
                    "mx-2 px-4 py-4 font-os text-base  text-[#3F3F46]  hover:text-zinc-900",
                    currentTab === 3
                      ? "font-normal text-zinc-900"
                      : "font-light",
                  )}
                >
                  Received Delegations
                </button>

                <div className="w-full border-b"></div>

                <button
                  onClick={() => setCurrentTab(4)}
                  className={cn(
                    "mx-2 px-4 py-4 font-os text-base  text-[#3F3F46]  hover:text-zinc-900",
                    currentTab === 4
                      ? "font-normal text-zinc-900"
                      : "font-light",
                  )}
                >
                  Proposals created
                </button>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full">
                {currentTab === 0 && (
                  <div className="pt-16">
                    <About address={address} />
                  </div>
                )}

                {currentTab === 1 && (
                  <div className="pt-16">
                    <h2 className="text-2xl font-medium">Goals for the DAO</h2>

                    <GoalsForTheDAO address={address} />
                  </div>
                )}

                {currentTab === 2 && (
                  <div className="overflow-hidden  pt-16">
                    <h2 className="text-2xl font-medium">Voting Powers</h2>

                    <div className="mt-3">
                      <VotingPower address={address} />
                    </div>
                  </div>
                )}

                {currentTab === 3 && (
                  <div className="overflow-hidden  pt-16">
                    <h2 className="text-2xl font-medium">
                      Received Delegations
                    </h2>

                    <div className="mt-3">
                      <ReceivedDelegations address={address} />
                    </div>
                  </div>
                )}

                {currentTab === 4 && (
                  <div className="w-full  overflow-hidden  pt-16">
                    <h2 className="text-2xl font-medium">Proposals created</h2>

                    <div className="mt-3">
                      <ProposalsCreated address={address} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile  */}
      <div className="md:hidden">
        <div className="flex h-auto justify-start gap-2 overflow-x-auto bg-white p-0 ">
          <button
            onClick={() => setCurrentTab(0)}
            className={`flex  w-[100px]  shrink-0 rounded-full px-3 py-2 font-os text-[10px] ${currentTab === 0 ? "bg-zinc-900 text-white" : "items-center bg-[#E0F2FE] text-zinc-900"}`}
          >
            About
          </button>

          <button
            onClick={() => setCurrentTab(1)}
            className={`flex  w-[100px]  shrink-0 rounded-full px-3 py-2 font-os text-[10px]  ${currentTab === 1 ? "bg-zinc-900 text-white" : "bg-[#E0F2FE] text-zinc-900"}`}
          >
            Goals for DAO
          </button>

          <button
            onClick={() => setCurrentTab(2)}
            className={`flex  w-[100px]  shrink-0 rounded-full px-3 py-2 font-os text-[10px]   ${currentTab === 2 ? "bg-zinc-900 text-white" : "bg-[#E0F2FE] text-zinc-900"}`}
          >
            Voting Power
          </button>

          <button
            onClick={() => setCurrentTab(3)}
            className={`flex w-[140px] shrink-0 rounded-full px-3 py-2 font-os text-[10px]   ${currentTab === 3 ? "bg-zinc-900 text-white" : "bg-[#E0F2FE] text-zinc-900"}`}
          >
            Received Delegations
          </button>

          <button
            onClick={() => setCurrentTab(4)}
            className={`flex w-[140px] shrink-0 rounded-full px-3 py-2 font-os text-[10px]   ${currentTab === 4 ? "bg-zinc-900 text-white" : "bg-[#E0F2FE] text-zinc-900"}`}
          >
            Proposals created
          </button>
        </div>

        <div className="mt-2 w-full rounded-2xl border-[4px] p-4">
          <div className="w-full">
            {currentTab === 0 && (
              <div className="overflow-hidden">
                <About address={address} />
              </div>
            )}

            {currentTab === 1 && (
              <div className="overflow-hidden">
                <h2 className="text-2xl font-medium">Goals for the DAO</h2>

                <GoalsForTheDAO address={address} />
              </div>
            )}

            {currentTab === 2 && (
              <div className="overflow-hidden  ">
                <h2 className="text-2xl font-medium">Voting Powers</h2>

                <div className="mt-3">
                  <VotingPower address={address} />
                </div>
              </div>
            )}

            {currentTab === 3 && (
              <div className="overflow-hidden  ">
                <h2 className="text-2xl font-medium">Received Delegations</h2>

                <div className="mt-3">
                  <ReceivedDelegations address={address} />
                </div>
              </div>
            )}

            {currentTab === 4 && (
              <div className="w-full  overflow-hidden  ">
                <h2 className="text-2xl font-medium">Proposals created</h2>

                <div className="mt-3">
                  <ProposalsCreated address={address} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
