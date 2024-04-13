import { titleCva } from "@/lib/cvas";
import clsx from "clsx";
import {
  ChevronDown,
  Copy,
  CopyCheck,
  MoveDownLeft,
  MoveUpRight,
} from "lucide-react";
import { useState } from "react";

const Transit = ({ item, address }: { item: any; address: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = (value: any) => {
    navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const [open, setOpen] = useState(false);
  const txInfo = item?.transaction?.txInfo;

  const value: any = {
    ETH: (Number(txInfo?.transferInfo?.value) / 10 ** 18)?.toFixed(2),
    USDC: (Number(txInfo?.transferInfo?.value) / 10 ** 6)?.toFixed(2),
    $ARB: (Number(txInfo?.transferInfo?.value) / 10 ** 18)?.toFixed(2),
    ARB: (Number(txInfo?.transferInfo?.value) / 10 ** 18)?.toFixed(2),
  };

  return item?.type === "DATE_LABEL" ? (
    <div className="mt-6 ">
      <h1
        className={titleCva({
          size: "xs",
        })}
      >
        {new Date(item?.timestamp)?.toLocaleDateString()}
      </h1>
    </div>
  ) : (
    <div className="mt-3 rounded-2xl border p-5">
      <button
        onClick={() => {
          txInfo?.type !== "Custom" && setOpen(!open);
        }}
        className="flex w-full items-center justify-between  "
      >
        <div className="  flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <MoveDownLeft
              size={20}
              className={clsx(
                txInfo?.direction === "INCOMING"
                  ? "text-green-500"
                  : txInfo?.type === "Custom"
                    ? "hidden"
                    : "rotate-180 text-red-500",
              )}
            />
            {txInfo?.type === "Custom" && (
              <img
                src={txInfo?.to?.logoUri}
                alt="Image"
                className="size-8 rounded-full"
              />
            )}
            <p className="text-sm ">
              {txInfo?.direction === "INCOMING"
                ? "Received"
                : txInfo?.type === "Custom"
                  ? txInfo?.to?.name
                  : "Sent"}
            </p>
            {txInfo?.type !== "Custom" && (
              <div className="ml-2 flex items-center gap-2">
                <p className="text-sm ">
                  {value?.[txInfo?.transferInfo?.tokenSymbol]}{" "}
                  {txInfo?.transferInfo?.tokenSymbol}
                </p>
              </div>
            )}
          </div>
          <div className="text-sm text-zinc-500">
            {new Date(item?.transaction?.timestamp)?.toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              },
            )}
          </div>
          <div
            className={clsx(
              "font-os text-sm font-medium capitalize ",

              item?.transaction?.txStatus === "SUCCESS"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {item?.transaction?.txStatus?.toLowerCase()}
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
        {txInfo?.type !== "Custom" && (
          <ChevronDown
            className={clsx(
              open ? "rotate-180 text-green-500" : "text-red-500  ",
            )}
            size={16}
          />
        )}
      </button>
      {open && (
        <div className="border-t pt-6 ">
          <a
            href={`https://app.safe.global/transactions/history?safe=arb1:${address}`}
            target="_blank"
            className="flex items-center gap-1"
          >
            <p className="text-sm  text-zinc-500 ">Transaction History :</p>
            {address?.slice(0, 4)}...
            {address?.slice(-10)}
            <MoveUpRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
};

export default Transit;
