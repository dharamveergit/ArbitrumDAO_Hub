import { chainId, fetcher, governanceId } from "@/lib/apis/fetcher";
import { GetOffChainProposalsDocument } from "@/lib/apis/snapshot/queries";
import {
  AddressDAOSProposals,
  CreatedProposalsQuery,
  GetAllProposalsQuery,
  GetDelegateByAddress,
  GetDelegates,
  ReceivedDelegationsGovernance,
} from "@/lib/apis/tally/queries";
import { useQuery } from "@tanstack/react-query";
import type { ICreatedProposals } from "./types/created-proposals";
import type { DelegateData } from "./types/delegate";
import type { DelegateProposals } from "./types/delegate-proposals";
import type { DelegatesData } from "./types/delegates";
import type { IGetAllOffChainProposals } from "./types/get-all-offchain-proposals";
import type { IGetAllProposalsQuery } from "./types/get-all-proposals";

const isProd = import.meta.env.PROD;

export type SortBy = "VOTES" | "DELEGATORS" | "RANDOM";

export function useProposals(sortBy: SortBy = "VOTES") {
  async function getAllProposals({
    offset = 0,
  }: {
    offset: number;
  }): Promise<IGetAllProposalsQuery> {
    const proposals = await fetcher({
      api: "TALLY",
      query: GetAllProposalsQuery,
      variables: {
        chainId: "eip155:42161",
        governanceIds: [
          "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
          "eip155:42161:0x8765C7171C9D367326f431810cdD755FD8fbc7E0",
          "eip155:42161:0x1E08D501851F3D5E4703cBa1f689f16573fBF610",
          "eip155:42161:0x1A90be02bBF03BA21922C19De6e5962166fcE73d",
          "eip155:42161:0x789fC99093B09aD01C34DC7251D0C89ce743e5a4",
          "eip155:42161:0x6ED4Ec2d30C6824058DBBCE2470582bB57800300",
          "eip155:42161:0x47F5Cc1ac2d088Ea7Cd9bBDBE7c96f81A9196CfF",
        ],
        includeVotes: false,
        pagination: {
          limit: 10,
          offset: offset,
        },
        sort: {
          field: "START_BLOCK",
          order: "DESC",
        },
        votersPagination: {
          limit: 1,
          offset: 0,
        },
      },
    });

    return { api: "TALLY", ...proposals };
  }

  async function getAllOffChainProposals({
    skip = 0,
  }: {
    skip: number;
  }): Promise<IGetAllOffChainProposals> {
    const proposals = await fetcher({
      api: "SNAPSHOT",
      query: GetOffChainProposalsDocument,
      variables: {
        first: 6,
        flagged: false,
        skip: skip,
        space_in: ["arbitrumfoundation.eth"],
        state: "all",
        title_contains: "",
      },
    });

    return { api: "SNAPSHOT", ...proposals };
  }

  return {
    getAllProposals,
    getAllOffChainProposals,
  };
}
