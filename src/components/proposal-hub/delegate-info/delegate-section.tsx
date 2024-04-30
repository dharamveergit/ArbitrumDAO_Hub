import { Skeleton } from "@/components/ui/skeleton";
import ReactQueryContext from "@/lib/react-query-context";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import AccountOverView from "./account-overview";
import { GradientHead } from "./gradient-head";
import About from "./tabs/about";
import GoalsForTheDAO from "./tabs/goals-for-the-dao";
import { ProposalsCreated } from "./tabs/proposals-created";
import { ReceivedDelegations } from "./tabs/received-delegations";
import { VotingPower } from "./tabs/voting-power";

const Index = ({ api }: { api: "TALLY" | "SNAPSHOT" }) => {
  return (
    <ReactQueryContext>
      <DelegateSection api={api} />
    </ReactQueryContext>
  );
};

export default Index;

const DelegateSection = ({ api }: { api: "TALLY" | "SNAPSHOT" }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [userIdParam, setUserIdParam] = useState("");

  useEffect(() => {
    const getUserIdParamFromUrl = () => {
      const params = new URLSearchParams(window.location.search);

      const query = params.get("userid");
      if (query) {
        setUserIdParam(query);
      }
    };

    getUserIdParamFromUrl();
  }, []);

  if (userIdParam.length > 0) {
    return (
      <div>
        <div className="lg:pb-10">
          <AccountOverView address={userIdParam} />
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
                      <About address={userIdParam} />
                    </div>
                  )}

                  {currentTab === 1 && (
                    <div className="pt-16">
                      <h2 className="text-2xl font-medium">
                        Goals for the DAO
                      </h2>

                      <GoalsForTheDAO address={userIdParam} />
                    </div>
                  )}

                  {currentTab === 2 && (
                    <div className="overflow-hidden  pt-16">
                      <h2 className="text-2xl font-medium">Voting Powers</h2>

                      <div className="mt-3">
                        <VotingPower address={userIdParam} />
                      </div>
                    </div>
                  )}

                  {currentTab === 3 && (
                    <div className="overflow-hidden  pt-16">
                      <h2 className="text-2xl font-medium">
                        Received Delegations
                      </h2>

                      <div className="mt-3">
                        <ReceivedDelegations address={userIdParam} />
                      </div>
                    </div>
                  )}

                  {currentTab === 4 && (
                    <div className="w-full  overflow-hidden  pt-16">
                      <h2 className="text-2xl font-medium">
                        Proposals created
                      </h2>

                      <div className="mt-3">
                        <ProposalsCreated address={userIdParam} />
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
                  <About address={userIdParam} />
                </div>
              )}

              {currentTab === 1 && (
                <div className="overflow-hidden">
                  <h2 className="text-2xl font-medium">Goals for the DAO</h2>

                  <GoalsForTheDAO address={userIdParam} />
                </div>
              )}

              {currentTab === 2 && (
                <div className="overflow-hidden  ">
                  <h2 className="text-2xl font-medium">Voting Powers</h2>

                  <div className="mt-3">
                    <VotingPower address={userIdParam} />
                  </div>
                </div>
              )}

              {currentTab === 3 && (
                <div className="overflow-hidden  ">
                  <h2 className="text-2xl font-medium">Received Delegations</h2>

                  <div className="mt-3">
                    <ReceivedDelegations address={userIdParam} />
                  </div>
                </div>
              )}

              {currentTab === 4 && (
                <div className="w-full  overflow-hidden  ">
                  <h2 className="text-2xl font-medium">Proposals created</h2>

                  <div className="mt-3">
                    <ProposalsCreated address={userIdParam} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GradientHead>
      <div className="flex  items-start  justify-end gap-x-10 lg:items-end">
        <div className="flex h-[138px] w-[150px] flex-shrink-0 items-center justify-center overflow-hidden   rounded-4xl bg-gray-100 md:h-[260px] md:w-[280px] lg:h-[350px] lg:w-[350px] ">
          <Skeleton className="flex  h-full w-full shrink-0 " />
        </div>

        <div className="w-full pb-2">
          <Skeleton className="flex h-5 w-52 text-[10px] font-normal  leading-[24px] text-gray-500 md:text-sm lg:text-base" />

          <Skeleton className="mt-1 h-10  w-48  text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl" />

          <Skeleton className="mt-4 h-5 w-52 max-w-[95%] text-[10px]  font-light  text-gray-500 md:text-base lg:text-lg" />

          <div className="mt-2 md:mt-4  lg:mt-8">
            <a>
              <svg
                width="32"
                height="26"
                viewBox="0 0 32 26"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path
                  d="M25.2019 0.736816H30.1087L19.3887 11.438L32 26H22.1239L14.3898 17.1682L5.54026 26H0.630418L12.0966 14.5538L0 0.736816H10.1238L17.1147 8.80937L25.1989 0.736816H25.2019ZM23.4797 23.4348H26.1987L8.64785 3.16726H5.73013L23.4797 23.4348Z"
                  fill="#18181B"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </GradientHead>
  );
};
