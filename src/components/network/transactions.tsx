import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Transactions = ({
  address,
  setTransactions,
}: {
  address: string;
  setTransactions: any;
}) => {
  const { data, status, error } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `https://safe-client.safe.global/v1/chains/42161/safes/${address}/transactions/history?trusted=false&cursor=limit=200`,
      );
      return res.json();
    },
    queryKey: ["transactions", address],
  });
  console.log(data?.results?.map((item: any) => item?.transaction));

  const [days, setDays] = useState(90);
  const results = data?.results
    ?.filter(
      (item: any) =>
        item?.type === "TRANSACTION" &&
        item?.transaction?.txInfo?.type === "Transfer" &&
        (item?.transaction?.txInfo?.transferInfo?.tokenSymbol === "USDC" ||
          item?.transaction?.txInfo?.transferInfo?.tokenSymbol === "$ARB" ||
          item?.transaction?.txInfo?.transferInfo?.tokenSymbol === "ARB"),
    )
    ?.map((item: any) => {
      return {
        ...item?.transaction,
        date: new Date(item?.transaction?.timestamp),
      };
    });

  const getDataFromDates = (arrayOFData: any, time: number) => {
    return arrayOFData?.filter((item: any) => {
      const today = new Date();
      const last7Days = new Date(today.setDate(today.getDate() - time));
      return new Date(item.date) > last7Days;
    });
  };

  const addTransactionsforSameDate = (dates: any) => {
    const res = dates?.reduce((acc: any, item: any) => {
      if (acc[item.date?.toLocaleDateString("en-US")]) {
        acc[item.date?.toLocaleDateString("en-US")].push(item);
      } else {
        acc[item.date?.toLocaleDateString("en-US")] = [item];
      }
      return acc;
    }, {});

    //add value of 0 to dates that have no transactions only the dates that have transactions

    return res;
  };

  const inflows =
    addTransactionsforSameDate(
      getDataFromDates(
        results?.filter((item: any) => item?.txInfo?.direction === "INCOMING"),
        days,
      ),
    ) || {};
  const outflows =
    addTransactionsforSameDate(
      getDataFromDates(
        results?.filter((item: any) => item?.txInfo?.direction === "OUTGOING"),
        days,
      ),
    ) || {};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const convertToDatas = (type: "inflows" | "outflows") => {
    const allDates =
      results?.length > 0
        ? Object?.keys(
            addTransactionsforSameDate(getDataFromDates(results, days)),
          ) ?? []
        : [];

    const res = allDates?.map((item) => {
      return type === "inflows"
        ? inflows?.[item]
          ? inflows[item]?.reduce((acc: any, item: any) => {
              const tranfer = item?.txInfo?.transferInfo;

              const inNumber = isNaN(Number(tranfer?.value))
                ? 0
                : Number(tranfer?.value);

              return (
                acc +
                (tranfer?.tokenSymbol === "USDC" ||
                tranfer?.tokenSymbol === "ARB"
                  ? inNumber / 10 ** 6
                  : inNumber / 10 ** 18)
              );
            }, 0)
          : 0
        : outflows?.[item]
          ? outflows[item]?.reduce((acc: any, item: any) => {
              const tranfer = item?.txInfo?.transferInfo;

              const outNumber = isNaN(Number(tranfer?.value))
                ? 0
                : Number(tranfer?.value);

              return (
                acc +
                (tranfer?.tokenSymbol === "USDC"
                  ? outNumber / 10 ** 6
                  : tranfer?.tokenSymbol === "$ARB" ||
                      tranfer?.tokenSymbol === "ARB"
                    ? (outNumber / 10 ** 18) * 1.44
                    : outNumber / 10 ** 18)
              );
            }, 0)
          : 0;
    });

    return res;
  };

  const res = {
    labels:
      results?.length > 0
        ? Object?.keys(
            addTransactionsforSameDate(getDataFromDates(results, days)),
          ) || []
        : [],
    datasets: [
      {
        label: "Inflows",
        //add data of same date
        data: convertToDatas("inflows") ?? [],
        borderColor: "#12AAFF",
        backgroundColor: "#12AAFF",
      },
      {
        label: "Outflows",
        data: convertToDatas("outflows") ?? [],
        borderColor: "#213147",
        backgroundColor: "#213147",
      },
    ],
  };

  useEffect(() => {
    setTransactions(data);
  }, [data]);

  return (
    <div className="flex flex-1 flex-col gap-10 md:col-span-2 lg:w-[60%] lg:pl-10">
      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-[#12AAFF]"></div>
            <p className="text-xs font-medium  text-zinc-500">Inflows</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-[#213147]"></div>
            <p className="text-xs font-medium  text-zinc-500">Outflows</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((item) => (
            <button
              key={item}
              onClick={() => setDays(item)}
              className={`text-xs font-medium  ${
                item === days ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {item} Days
            </button>
          ))}
        </div>
      </div>
      <Line options={options} data={res} />
    </div>
  );
};

export default Transactions;
