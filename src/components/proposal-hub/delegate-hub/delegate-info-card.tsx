import { Skeleton } from "@/components/ui/skeleton";
import { getWeightLabel, stringToBigNumber } from "@/lib/bignumber";
import { getSplitText } from "@/lib/utils";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import type { Delegate } from "../types/delegates";
import { ApiBadge } from "./api-badge";

export interface IDelegatesInfoCard {
  userName: string;
  avatar: string | null;
  description: string;
  twitterUsername: string;
  address: string;
  arb: string;
  delegate: Delegate;
  decimals: number;
  api: "TALLY" | "SNAPSHOT";
  cardType: "FULL" | "SEARCH";
}

export const DelegatesInfoCard = ({
  userName,
  avatar,
  description,
  twitterUsername,
  address,
  delegate,
  decimals,
  api,
  cardType = "FULL",
}: IDelegatesInfoCard) => {
  const bigVoteWeight = stringToBigNumber(delegate.votesCount);
  const voteWeightFormatted = decimals
    ? getWeightLabel(bigVoteWeight, decimals)
    : undefined;

  const identiconAvatar = createAvatar(openPeeps, {
    size: 67,
    seed: address,
    scale: 80,
  });

  if (cardType === "FULL") {
    return (
      <a
        href={`/proposal-hub/${address}`}
        className="flex min-h-[289px]  flex-col justify-between overflow-hidden rounded-2xl border p-5"
      >
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-[67px] w-[67px]  flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {avatar ? (
                <img src={avatar} className="h-full w-full" />
              ) : (
                <img
                  src={identiconAvatar.toDataUriSync()}
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="flex w-full justify-between">
              <div>
                <h3 className="text-base font-medium">
                  {userName ? userName : getSplitText(address, 6, 4)}
                </h3>
                <p className="mt-0.5 text-[10px] font-normal text-gray-500">
                  {voteWeightFormatted} ARB
                </p>
              </div>

              <div className="shrink-0">
                <ApiBadge api={api} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="line-he text-xs font-normal leading-[16px] text-gray-500">
              {description ? description : "No bio provided"}
            </p>
          </div>
        </div>

        <div className="mt-4  flex justify-end">
          {twitterUsername && (
            <a href={`https://twitter.com/${twitterUsername}`} target="_blank">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_2544_778)">
                  <rect
                    x="2"
                    y="1"
                    width="32"
                    height="32"
                    rx="16"
                    fill="white"
                  />
                  <rect
                    x="2.5"
                    y="1.5"
                    width="31"
                    height="31"
                    rx="15.5"
                    stroke="#E4E4E7"
                  />
                  <path
                    d="M22.6009 10.6843H25.0544L19.6943 16.0349L26 23.3159H21.062L17.1949 18.9L12.7701 23.3159H10.3152L16.0483 17.5928L10 10.6843H15.0619L18.5574 14.7206L22.5995 10.6843H22.6009ZM21.7399 22.0333H23.0993L14.3239 11.8995H12.8651L21.7399 22.0333Z"
                    fill="#71717A"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_2544_778"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2544_778"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2544_778"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </a>
          )}
        </div>
      </a>
    );
  }

  if (cardType === "SEARCH") {
    return (
      <div className="w-full">
        <div className="flex w-full items-center gap-4">
          <div className="flex h-[50px] w-[50px]  flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {avatar ? (
              <img src={avatar} className="h-full w-full" />
            ) : (
              <img
                src={identiconAvatar.toDataUriSync()}
                className="h-full w-full"
              />
            )}
          </div>

          <div className="flex w-full justify-between ">
            <div>
              <h3 className="text-base font-medium">
                {userName ? userName : getSplitText(address, 6, 4)}
              </h3>
              <p className="text-[10px] font-normal text-gray-500">
                {voteWeightFormatted} ARB
              </p>
            </div>

            <div>
              <ApiBadge api={api} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

DelegatesInfoCard.skeleton = () => {
  return (
    <div className="flex min-h-[289px]   flex-col justify-between rounded-2xl border p-5">
      <div>
        <div className="flex items-center gap-4">
          <div className="flex h-[67px] w-[67px]  flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="flex w-full justify-between">
            <div className="w-full">
              <Skeleton className="h-5 w-[70%]" />
              <Skeleton className="mt-1 h-3 w-[25%]" />
            </div>

            <Skeleton className="h-5 w-14" />
          </div>
        </div>

        <div className="mt-8">
          <p className="line-he text-xs font-normal leading-[16px] text-zinc-500">
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-[50%]" />
          </p>
        </div>
      </div>

      <div className="flex  justify-end">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
};
