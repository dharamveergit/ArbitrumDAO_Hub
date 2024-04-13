import { useQuery } from "@tanstack/react-query";
import type { DelegateData } from "../../types/delegate";
import { useDelegates } from "../../useDelegates";

const GoalsForTheDAO = ({ address }: { address: string }) => {
  const { getDelegateByAddress } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
  });

  if (delegate.isLoading) {
    return <div>loading</div>;
  }

  if (delegate.isError) {
    return <div>error</div>;
  }

  if (delegate.data && delegate.data.delegate) {
    return (
      <>
        <p className="mt-2 text-base font-light text-zinc-700">
          {delegate.data.delegate.statement.statementSummary}
        </p>
      </>
    );
  }

  return null;
};

export default GoalsForTheDAO;
