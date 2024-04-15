import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
const api =
  "https://safe-transaction-arbitrum.safe.global/api/v1/safes/0x544cBe6698E2e3b676C76097305bBa588dEfB13A/";
const Test = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GetRes />
    </QueryClientProvider>
  );
};

export default Test;

const GetRes = () => {
  const { data, status, error } = useQuery({
    queryFn: async () => {
      const res = await fetch(api);
      return res.json();
    },
    queryKey: ["safe"],
  });

  console.log(data, error);

  return (
    <div>
      api test : Long-Term Incentive Pilot Program : {data?.threshold}/
      {data?.threshold + data?.nonce}
    </div>
  );
};
