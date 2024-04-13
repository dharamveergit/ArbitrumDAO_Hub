import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { titleCva } from "@/lib/cvas";
import { useState } from "react";
import Signers from "./signers";
import Transactions from "./transactions";
import Transit from "./transit";

export const arbAbi =
  "https://safe-transaction-arbitrum.safe.global/api/v1/safes";
const Multisig = ({ name, address }: { name: string; address: string }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Page name={name} address={address} />
    </QueryClientProvider>
  );
};

export default Multisig;

const Page = ({ name, address }: { name: string; address: string }) => {
  const { data, status, error } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${arbAbi}/${address}/balances/?trusted=false&exclude_spam=false`,
      );
      return res.json();
    },
    queryKey: ["balances", address],
  });

  const eth =
    data?.length > 0
      ? data?.find((item: any) => item.token === null)?.balance / 10 ** 18
      : 0;
  const arb =
    data?.length > 0
      ? (data?.find((item: any) => item?.token?.symbol === "ARB")?.balance ??
          0) /
        10 ** 18
      : 0;
  const usdc =
    data?.length > 0
      ? (data?.find((item: any) => item?.token?.symbol === "USDC")?.balance ??
          0) /
        10 ** 6
      : 0;

  const ethToUsd = eth * 3335.93;
  const arbToUsd = arb * 1.44;
  const total = ethToUsd + arbToUsd + usdc;

  const convertToMillionOrThousand = (value: number) => {
    if (value / 1000000 < 1) {
      return (value / 1000)?.toFixed(1) + "k";
    } else {
      return (value / 1000000)?.toFixed(1) + "m";
    }
  };

  const [transactions, setTransactions] = useState<any>([]);
  console.log(transactions);

  return (
    <>
      <div
        className={
          "my-5 flex  flex-col items-start  rounded-4xl bg-sky px-2 pt-32 md:rounded-3xl  md:px-4 lg:my-10 lg:rounded-5xl lg:px-5 lg:pt-40"
        }
      >
        <small className="font-os text-xs font-light uppercase text-gray-500 md:text-sm">
          {total / 1000000 < 1
            ? (total / 1000)?.toFixed(1) + "K USD"
            : (total / 1000000)?.toFixed(1) + "M USD"}
        </small>
        <h1 className="mt-3 text-2xl font-medium md:text-3xl  lg:text-4xl">
          {name}
        </h1>
        <p className="mt-2 max-w-2xl font-os text-sm text-gray-500 md:text-base lg:text-lg">
          Wallet Address: {address?.slice(0, 6) + "..." + address?.slice(-4)}
        </p>
      </div>
      <div className="h-px w-full bg-zinc-200"></div>
      <section className="grid grid-cols-1 gap-10 divide-zinc-200 md:grid-cols-2 lg:flex lg:divide-x">
        <Signers address={address} />
        <div className="flex flex-col gap-5 md:pl-10 ">
          <h1 className="text-sm font-medium lg:text-base">Funds Breakdown</h1>
          <div>
            <div className="flex flex-col  gap-4">
              <div className="flex items-center justify-between gap-2">
                <p className="w-10 text-sm font-medium text-zinc-500 lg:text-base">
                  ETH
                </p>
                <p className="text-sm font-medium text-zinc-900 lg:text-base">
                  {eth?.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="w-10 text-sm font-medium text-zinc-500 lg:text-base">
                  USDC
                </p>
                <p className="text-sm font-medium text-zinc-900 lg:text-base">
                  {convertToMillionOrThousand(usdc)}
                </p>
              </div>

              <div className="flex items-center justify-between  gap-2 border-b border-zinc-400 pb-2 ">
                <p className="w-10 text-sm font-medium text-zinc-500 lg:text-base">
                  ARB
                </p>
                <p className="text-sm font-medium text-zinc-900 lg:text-base">
                  {convertToMillionOrThousand(arb)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2  pt-2 ">
              <p className="w-10 text-sm font-medium text-zinc-500 lg:text-base">
                USD
              </p>
              <p className="text-sm font-medium text-zinc-900 lg:text-base">
                {convertToMillionOrThousand(total)}
              </p>
            </div>
          </div>
        </div>
        <Transactions address={address} setTransactions={setTransactions} />
      </section>
      <div className="h-px w-full bg-zinc-200" />
      <section className="flex flex-col gap-4">
        <h1 className={titleCva()}>Transactions</h1>
        {transactions?.results?.length > 0 &&
          transactions?.results?.map((item: any, index: any) => {
            return <Transit key={index} item={item} address={address} />;
          })}
      </section>
    </>
  );
};
