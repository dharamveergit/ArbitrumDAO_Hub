import ReactQueryContext from "@/lib/react-query-context";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightCircle, ArrowUpCircle } from "lucide-react";
import Button from "../ui/button";
import { DelegatesInfoCard } from "./delegate-hub/delegate-info-card";
import type { DelegatesData } from "./types/delegates";
import { useDelegates } from "./useDelegates";

const Index = () => {
  return (
    <ReactQueryContext>
      <RecentDelegatesGrid />
    </ReactQueryContext>
  );
};

export default Index;

const RecentDelegatesGrid = () => {
  const { getDelegates } = useDelegates();

  const delegatesData = useQuery<DelegatesData, Error>({
    queryKey: ["DELEGATESGRID", "VOTES"],
    queryFn: () => getDelegates({ sortBy: "VOTES" }),
  });

  if (delegatesData.isError) {
    return <div>{delegatesData.error.message}</div>;
  }

  if (delegatesData.isLoading) {
    return (
      <div>
        <h3 className="font-sans text-lg font-medium text-zinc-900 md:text-2xl">
          Recent Delegate Votes
        </h3>
        <div className="mt-5 grid w-full grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <DelegatesInfoCard.skeleton key={i} />
          ))}
        </div>
        <div className="mt-5">
          <Button size="default" href="/proposal-hub/delegate-hub">
            Visit Delegate Hub
          </Button>
        </div>
      </div>
    );
  }

  if (delegatesData.data && delegatesData.data.delegates) {
    if (delegatesData.data.delegates.nodes.length === 0) {
      return <div>no delegates found</div>;
    }

    return (
      <div>
        <h3 className="font-sans text-lg font-medium text-zinc-900 md:text-2xl">
          Recent Delegate Votes
        </h3>
        <div className="mt-5 grid w-full grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
          {delegatesData.data.delegates.nodes.slice(0, 3).map((delegate, i) => {
            return (
              <DelegatesInfoCard
                key={i}
                decimals={delegatesData.data.governance.tokens[0].decimals}
                delegate={delegate}
                userName={delegate.account.name}
                avatar={delegate.account.picture}
                description={delegate.statementV2.statementSummary}
                twitterUsername={delegate.account.twitter}
                address={delegate.account.address}
                arb={delegate.votesCount}
                api={delegatesData.data.api}
                cardType="FULL"
              />
            );
          })}
        </div>

        <div className="mt-5">
          <Button size="default" href="/proposal-hub/delegate-hub">
            Visit Delegate Hub
            <ArrowUpCircle
              size={20}
              strokeWidth={1}
              className="ml-1 h-4 w-4 rotate-45"
            />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
