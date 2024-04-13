import { chainId, fetcher, governanceId } from "@/lib/apis/fetcher";
import { GetTokenStats } from "@/lib/apis/tally/queries";
import { getWeightLabel } from "@/lib/bignumber";
import { useQuery } from "@tanstack/react-query";
import type { Governance, TokenStats } from "../types/token-stats";

const isProd = import.meta.env.PROD;

async function getTokenStats(): Promise<TokenStats> {
  const tokenStats = await fetcher({
    api: "TALLY",
    query: GetTokenStats,
    variables: {
      governanceId: "eip155:42161:0x1A90be02bBF03BA21922C19De6e5962166fcE73d",
    },
  });

  return { api: "TALLY", ...tokenStats };
}

export function useTokenStats() {
  const formatStats = ({ governance }: { governance: Governance }) => {
    // If no governanceId is provided, just return a basic "-" value
    if (!Boolean(governance.id)) {
      return {
        quorum: "-",
        delegatedTokens: "-",
        proposalThreshold: "-",
        totalSupply: "-",
      };
    }

    if (!governance) {
      return {
        quorum: null,
        delegatedTokens: null,
        proposalThreshold: null,
        totalSupply: null,
      };
    }

    const { decimals } = governance?.tokens[0];

    const quorum = getWeightLabel(governance.quorum, decimals, true, 1);

    const delegatedTokens = getWeightLabel(
      governance.stats.tokens.delegatedVotingPower,
      decimals,
      true,
      1,
    );

    const proposalThreshold = getWeightLabel(
      governance.parameters.proposalThreshold,
      decimals,
      true,
      1,
    );

    const totalSupply = getWeightLabel(
      governance.stats.tokens.supply,
      decimals,
      true,
      1,
    );

    return { quorum, delegatedTokens, proposalThreshold, totalSupply };
  };

  const getTokenStatsQuery = useQuery<TokenStats, Error>({
    queryKey: ["TOKEN_STATS"],
    queryFn: getTokenStats,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    //   initialData: initialData,
  });

  return {
    getTokenStatsQuery,
    formatStats,
  };
}
