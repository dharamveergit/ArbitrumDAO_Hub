import { Skeleton } from "@/components/ui/skeleton";
import { getSplitText } from "@/lib/utils";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useQuery } from "@tanstack/react-query";
import type { DelegateData } from "../types/delegate";
import { useDelegates } from "../useDelegates";
import { GradientHead } from "./gradient-head";

const AccountOverView = ({ address }: { address: string }) => {
  const { getDelegateByAddress } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
  });

  if (delegate.isError) {
    return <div>error</div>;
  }

  if (delegate.isLoading) {
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
  }

  if (delegate.data && delegate.data.delegate) {
    const identiconAvatar = createAvatar(openPeeps, {
      size: 67,
      seed: delegate.data.delegate.account.address,
      scale: 80,
    });

    const { account } = delegate.data.delegate;

    return (
      <GradientHead>
        <div className="flex  items-start  justify-end gap-x-10 lg:items-end">
          <div className="flex h-[138px] w-[150px] flex-shrink-0 items-center justify-center overflow-hidden   rounded-4xl bg-gray-100 md:h-[260px] md:w-[280px] lg:h-[350px] lg:w-[350px] ">
            {account.picture ? (
              <img src={account.picture} className="h-full w-full " />
            ) : (
              <img
                src={identiconAvatar.toDataUriSync()}
                className="h-full w-full"
              />
            )}
          </div>

          <div className="pb-2">
            <p className="text-[10px] font-normal  leading-[24px] text-gray-500 md:text-sm lg:text-base">
              {getSplitText(account.address, 12, 4)}
            </p>
            <h1 className="mt-1   text-lg font-medium leading-[40px] md:text-3xl lg:text-4xl">
              {account.name ? account.name : account.address}
            </h1>
            <p className="mt-4 max-w-[95%] text-[10px]  font-light  text-gray-500 md:text-base lg:text-lg">
              {account.bio ? account.bio : "No bio provided"}
            </p>

            <div className="mt-2 md:mt-4  lg:mt-8">
              {account.twitter && (
                <a href={`https://twitter.com/${account.twitter}`}>
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
              )}
            </div>
          </div>
        </div>
      </GradientHead>
    );
  }

  return null;
};

export default AccountOverView;
