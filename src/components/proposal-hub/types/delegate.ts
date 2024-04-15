export interface DelegateData {
  api: "TALLY" | "SNAPSHOT";
  delegate: Delegate;
  governorsV2: GovernorsV2;
  tokenBalance: TokenBalance;
  organization: Organization;
}

export interface Delegate {
  id: string;
  delegatorsCount: number;
  statement: Statement;
  account: Account;
  votesCount: string;
  token: DelegateToken;
  voteChanges: VoteChange[];
}

export interface Account {
  proposalsCreatedCount: number;
  picture: string;
  email: string;
  bio: string;
  address: string;
  ens: string;
  name: string;
  twitter: string;
  features: any[];
}

export interface Statement {
  address: string;
  dataSource: string;
  dataSourceURL: string;
  discourseProfileLink: string;
  discourseUsername: string;
  id: string;
  isSeekingDelegation: boolean;
  issues: null;
  organizationID: string;
  statement: string;
  statementSummary: string;
}

export interface DelegateToken {
  decimals: number;
  id: ID;
  isBehind: boolean;
  isIndexing: boolean;
  name: Name;
}

export enum ID {
  Eip15542161Erc200X912CE59144191C1204E64559FE8253A0E49E6548 = "eip155:42161/erc20:0x912CE59144191C1204E64559FE8253a0e49E6548",
}

export enum Name {
  Arbitrum = "Arbitrum",
}

export interface VoteChange {
  prevBalance: string;
  newBalance: string;
  netChange: string;
  token: VoteChangeToken;
  timestamp: Date;
}

export interface VoteChangeToken {
  decimals: number;
  id: ID;
  name: Name;
}

export interface GovernorsV2 {
  nodes: GovernorNode[];
}

export interface GovernorNode {
  id: string;
  name: string;
  kind: string;
  quorum: string;
  chainId: string;
  contracts: Contracts;
}

export interface Contracts {
  governor: Governor;
  tokens: Governor[];
}

export interface Governor {
  address: string;
  type: string;
}

export interface Organization {
  id: string;
  name: Name;
  slug: string;
  metadata: Metadata;
  myRole: null;
  uxVersion: string;
  votersCount: number;
  chainIds: string[];
  creator: Creator;
  proposalsCount: number;
  governances: Governance[];
}

export interface Creator {
  name: string;
  bio: string;
  email: string;
}

export interface Governance {
  id: string;
  active: boolean;
  name: string;
  stats: Stats;
}

export interface Stats {
  proposals: Proposals;
}

export interface Proposals {
  total: number;
}

export interface Metadata {
  icon: string;
  description: string;
  color: null;
  socials: Socials;
}

export interface Socials {
  twitter: string;
}

export interface TokenBalance {
  balance: string;
}
