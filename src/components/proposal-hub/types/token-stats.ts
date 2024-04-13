export interface TokenStats {
  api: "TALLY" | "SNAPSHOT";
  governance: Governance;
}

export interface Governance {
  id: string;
  chainId: string;
  name: string;
  stats: Stats;
  quorum: string;
  parameters: Parameters;
  tokens: Token[];
}

export interface Parameters {
  proposalThreshold: string;
}

export interface Stats {
  tokens: Tokens;
}

export interface Tokens {
  owners: number;
  voters: number;
  supply: string;
  delegatedVotingPower: string;
}

export interface Token {
  symbol: string;
  decimals: number;
}
