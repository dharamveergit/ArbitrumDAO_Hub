import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bigNumberToNumber, stringToBigNumber } from "@/lib/bignumber";
import { getSplitText } from "@/lib/utils";
import { openPeeps } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { DelegateData } from "../../types/delegate";
import type { IReceivedDelegations } from "../../types/received-delegations";
import { useDelegates } from "../../useDelegates";
import StatCard from "../stat-card";

export const ReceivedDelegations = ({ address }: { address: string }) => {
  const { getDelegateByAddress } = useDelegates();

  const delegate = useQuery<DelegateData, Error>({
    queryKey: ["DELEGATE", address],
    queryFn: () => getDelegateByAddress({ address: address }),
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (delegate.isLoading) {
    return <div>loading</div>;
  }

  if (delegate.isError) {
    return <div>error</div>;
  }

  if (delegate.data && delegate.data.delegate) {
    const { account, votesCount } = delegate.data.delegate;

    const decimals = delegate.data.delegate.token.decimals;

    const totalTokensOwned =
      delegate.data.tokenBalance.balance && decimals
        ? bigNumberToNumber(
            stringToBigNumber(delegate.data.tokenBalance.balance),
            decimals,
          ).toFixed(2)
        : "";

    const votingPower =
      votesCount && decimals
        ? bigNumberToNumber(stringToBigNumber(votesCount), decimals).toFixed(2)
        : "";

    return (
      <>
        {/* Desktop */}
        <div className="hidden h-[134px] w-full grid-cols-3 gap-2 lg:grid">
          <StatCard
            variant="DARK"
            label="Received Delegations"
            value={delegate.data.delegate.delegatorsCount}
          />

          <StatCard
            variant="LIGHT"
            label="Total Tokens Owned"
            value={totalTokensOwned}
          />
          <StatCard variant="LIGHT" label="Voting Power" value={votingPower} />
        </div>

        {/* Tablet */}
        <div className="hidden overflow-hidden md:block lg:hidden">
          <div className="h-[134px] w-full">
            <StatCard
              variant="DARK"
              label="Received Delegations"
              value={delegate.data.delegate.delegatorsCount}
            />
          </div>

          <div className="mt-2 grid h-[134px] grid-cols-2 gap-2">
            <StatCard
              variant="LIGHT"
              label="Total Tokens Owned"
              value={totalTokensOwned}
            />
            <StatCard
              variant="LIGHT"
              label="Voting Power"
              value={votingPower}
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="block overflow-hidden md:hidden ">
          <div className="h-[134px] w-full">
            <StatCard
              variant="DARK"
              label="Received Delegations"
              value={delegate.data.delegate.delegatorsCount}
            />
          </div>

          <div className="mt-2 grid h-[134px] grid-cols-2 gap-2">
            <StatCard
              variant="LIGHT"
              label="Total Tokens Owned"
              value={totalTokensOwned}
            />
            <StatCard
              variant="LIGHT"
              label="Voting Power"
              value={votingPower}
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-8">
          <ReceivedDelegationsTable voterAddress={address} />
        </div>
      </>
    );
  }
};

export const ReceivedDelegationsTable = ({
  voterAddress,
}: {
  voterAddress: string;
}) => {
  const { getDelegations } = useDelegates();

  const receivedDelegations = useQuery<IReceivedDelegations, Error>({
    queryKey: ["Received_Delegations", voterAddress],
    queryFn: () => getDelegations({ address: voterAddress }),
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if (receivedDelegations.isLoading) {
    return <div>loading</div>;
  }

  if (receivedDelegations.isError) {
    return <div>{receivedDelegations.error.message}</div>;
  }

  if (receivedDelegations.data) {
    const isSelfDelegation = (address: string) =>
      getAddress(address) === getAddress(voterAddress);

    return (
      <>
        {/* Desktop */}
        <div className="hidden lg:block">
          <Table className="w-full">
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow className="border-b-0">
                <TableHead className="w-[50%] font-os text-sm font-medium text-zinc-400">
                  Delegator
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Governance
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Delegation Date
                </TableHead>
                <TableHead className="font-os text-sm font-medium text-zinc-400 ">
                  Votes
                </TableHead>
              </TableRow>
            </TableHeader>

            {receivedDelegations.data.delegators.nodes.map(
              (delegate, index) => {
                const identiconAvatar = createAvatar(openPeeps, {
                  size: 67,
                  seed: delegate.delegator.address,
                  scale: 80,
                });

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-x-3">
                        <div className="h-[48px] w-[48px] shrink-0">
                          {delegate.delegator.picture ? (
                            <img
                              src={delegate.delegator.picture}
                              className="h-full w-full rounded-xl bg-gray-100"
                            />
                          ) : (
                            <img
                              src={identiconAvatar.toDataUriSync()}
                              className="h-full w-full rounded-xl bg-gray-100"
                            />
                          )}
                        </div>

                        <p className="text-base font-medium text-zinc-900">
                          {getSplitText(delegate.delegator.address, 12, 6)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <img
                          src={
                            receivedDelegations.data.organization.metadata.icon
                          }
                          className="h-[32px] w-[32px]  rounded-full bg-gray-100"
                        />

                        <p className="text-base font-light text-zinc-900">
                          {receivedDelegations.data.organization.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-base font-light text-zinc-900">
                        {dayjs(delegate.blockTimestamp).format("MMM D, YYYY")}
                      </p>
                    </TableCell>
                    <TableCell>
                      {isSelfDelegation(delegate.delegator.address) ? (
                        <p className="text-base font-light text-zinc-900">
                          Self Delegation
                        </p>
                      ) : null}

                      {delegate.votes ? (
                        <p className="text-base font-light text-zinc-900">
                          {bigNumberToNumber(
                            BigNumber.from(delegate.votes),
                            18,
                          ).toFixed(2)}
                        </p>
                      ) : null}
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </Table>
        </div>

        {/* Tablet */}
        <div className="hidden md:block lg:hidden">
          <Table className="w-full">
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow className="border-b-0">
                <TableHead className="w-[70%] font-os text-sm font-medium text-zinc-400">
                  Delegator
                </TableHead>
                <TableHead className="w-full font-os text-sm font-medium text-zinc-400 ">
                  Voting Activity
                </TableHead>
              </TableRow>
            </TableHeader>

            {receivedDelegations.data.delegators.nodes.map(
              (delegate, index) => {
                const identiconAvatar = createAvatar(openPeeps, {
                  size: 67,
                  seed: delegate.delegator.address,
                  scale: 80,
                });

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-x-3">
                        <div className="h-[48px] w-[48px] shrink-0">
                          {delegate.delegator.picture ? (
                            <img
                              src={delegate.delegator.picture}
                              className="h-full w-full rounded-xl bg-gray-100"
                            />
                          ) : (
                            <img
                              src={identiconAvatar.toDataUriSync()}
                              className="h-full w-full rounded-xl bg-gray-100"
                            />
                          )}
                        </div>

                        <p className="text-base font-medium text-zinc-900">
                          {getSplitText(delegate.delegator.address, 12, 6)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-x-2">
                          <img
                            src={
                              receivedDelegations.data.organization.metadata
                                .icon
                            }
                            className="h-[24px] w-[24px]  rounded-full bg-gray-100"
                          />

                          <p className=" text-sm font-light text-zinc-900">
                            {receivedDelegations.data.organization.name}
                          </p>
                        </div>
                        <p className="text-sm font-light text-zinc-900">
                          {dayjs(delegate.blockTimestamp).format("MMM D, YYYY")}
                        </p>

                        {isSelfDelegation(delegate.delegator.address) ? (
                          <p className="text-sm font-light text-zinc-900">
                            Self Delegation
                          </p>
                        ) : null}

                        {delegate.votes ? (
                          <p className="text-sm font-light text-zinc-900">
                            {bigNumberToNumber(
                              BigNumber.from(delegate.votes),
                              18,
                            ).toFixed(2)}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </Table>
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          <Table className="w-full">
            <TableHeader className="bg-[#F0F9FF] ">
              <TableRow>
                <TableHead className="w-[70%] font-os text-sm font-medium text-zinc-400">
                  Delegator
                </TableHead>
              </TableRow>
            </TableHeader>

            {receivedDelegations.data.delegators.nodes.map(
              (delegate, index) => {
                const identiconAvatar = createAvatar(openPeeps, {
                  size: 67,
                  seed: delegate.delegator.address,
                  scale: 80,
                });

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col ">
                        <div className="flex items-center gap-x-3">
                          <div className="h-[34px] w-[34px] shrink-0">
                            {delegate.delegator.picture ? (
                              <img
                                src={delegate.delegator.picture}
                                className="h-full w-full rounded-xl bg-gray-100"
                              />
                            ) : (
                              <img
                                src={identiconAvatar.toDataUriSync()}
                                className="h-full w-full rounded-xl bg-gray-100"
                              />
                            )}
                          </div>

                          <p className="text-sm font-medium text-zinc-900">
                            {getSplitText(delegate.delegator.address, 12, 6)}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center gap-x-2">
                            <img
                              src={
                                receivedDelegations.data.organization.metadata
                                  .icon
                              }
                              className="h-[18px] w-[18px]  rounded-full bg-gray-100"
                            />

                            <p className="text-xs font-light text-zinc-900">
                              {receivedDelegations.data.organization.name}
                            </p>
                          </div>
                          <p className="text-xs font-light text-zinc-900">
                            {dayjs(delegate.blockTimestamp).format(
                              "MMM D, YYYY",
                            )}
                          </p>

                          {isSelfDelegation(delegate.delegator.address) ? (
                            <p className="text-xs font-light text-zinc-900">
                              Self Delegation
                            </p>
                          ) : null}

                          {delegate.votes ? (
                            <p className="text-xs font-light text-zinc-900">
                              {bigNumberToNumber(
                                BigNumber.from(delegate.votes),
                                18,
                              ).toFixed(2)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </Table>
        </div>
      </>
    );
  }
};
