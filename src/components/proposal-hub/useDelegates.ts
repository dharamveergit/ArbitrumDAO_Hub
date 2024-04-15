import { chainId, fetcher, governanceId } from "@/lib/apis/fetcher";
import {
  AddressDAOSProposals,
  CreatedProposalsQuery,
  GetDelegateByAddress,
  GetDelegates,
  ReceivedDelegationsGovernance,
} from "@/lib/apis/tally/queries";
import { useQuery } from "@tanstack/react-query";
import type { ICreatedProposals } from "./types/created-proposals";
import type { DelegateData } from "./types/delegate";
import type { DelegateProposals } from "./types/delegate-proposals";
import type { DelegatesData } from "./types/delegates";
import type { IReceivedDelegations } from "./types/received-delegations";

const isProd = import.meta.env.PROD;

export type SortBy = "VOTES" | "DELEGATORS" | "RANDOM";

// { sortBy = "VOTING_POWER" }: { sortBy: SortBy }

export function useDelegates() {
  async function getDelegates({
    sortBy = "VOTES",
    afterCursor,
  }: {
    sortBy: SortBy;
    afterCursor?: number;
  }): Promise<DelegatesData> {
    const delegates = await fetcher({
      api: "TALLY",
      query: GetDelegates,
      variables: {
        delegatesInput: {
          filters: {
            governorId: governanceId,
            organizationId: "2206072050315953936",
          },
          page: {
            limit: 16,
            afterCursor: afterCursor ? afterCursor : null,
            // offset: offset,
          },
          sort: {
            isDescending: true,
            sortBy: sortBy,
          },
        },
      },
    });

    return { api: "TALLY", ...delegates };
  }

  async function getDelegateByAddress({
    address,
  }: {
    address: string;
  }): Promise<DelegateData> {
    const delegate = await fetcher({
      api: "TALLY",
      query: GetDelegateByAddress,
      variables: {
        delegatesByAddressInput: {
          address: address,
          governorId: "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
          organizationId: 2206072050315954000,
        },
        proposalsCountInput: {
          governorId: "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
        },
        governorsInput: {
          filters: {
            organizationId: "2206072050315953936",
          },
          sort: {
            sortBy: "ID",
            isDescending: true,
          },
        },
        tokenInput: {
          governorID: "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
          address: address,
        },
      },
    }).catch((e) => console.log(e));

    return { api: "TALLY", ...delegate };
  }

  async function getAddressDAOSProposals({
    address,
  }: {
    address: string;
  }): Promise<DelegateProposals> {
    const delegate = await fetcher({
      api: "TALLY",
      query: AddressDAOSProposals,
      variables: {
        pagination: {
          limit: 20,
          offset: 0,
        },
        address: address,
        governanceIds: [
          "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
          "eip155:42161:0x789fC99093B09aD01C34DC7251D0C89ce743e5a4",
        ],
        chainId: "eip155:42161",
      },
    });

    return { api: "TALLY", ...delegate };
  }

  async function getDelegations({
    address,
  }: {
    address: string;
  }): Promise<IReceivedDelegations> {
    const delegate = await fetcher({
      api: "TALLY",
      query: ReceivedDelegationsGovernance,
      variables: {
        delegationInput: {
          filters: {
            governorId:
              "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
            address: address,
          },
          sort: {
            isDescending: true,
            sortBy: "ID",
          },
          page: { limit: 10 },
        },
      },
    });

    return { api: "TALLY", ...delegate };
  }

  async function getCreatedProposals({
    address,
  }: {
    address: string;
  }): Promise<ICreatedProposals> {
    const delegate = await fetcher({
      api: "TALLY",
      query: CreatedProposalsQuery,
      variables: {
        proposers: [address],
        governanceIds: [
          "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
          "eip155:42161:0x789fC99093B09aD01C34DC7251D0C89ce743e5a4",
        ],
        chainId: "eip155:42161",
        pagination: {
          offset: 0,
          limit: 10,
        },
      },
    });

    return { api: "TALLY", ...delegate };
  }

  return {
    getDelegates,
    getDelegateByAddress,
    getAddressDAOSProposals,
    getDelegations,
    getCreatedProposals,
  };
}
