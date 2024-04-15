export interface ICreatedProposals {
  api: "TALLY" | "SNAPSHOT";
  proposals: Proposal[];
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
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

export interface Proposal {
  id: string;
  description: string;
  statusChanges: StatusChange[];
  block: Block;
  voteStats: VoteStat[];
  tallyProposal: TallyProposal;
}

export interface Block {
  timestamp: Date;
}

export interface StatusChange {
  type: string;
}

export interface TallyProposal {
  id: string;
  status: string;
}

export interface VoteStat {
  votes: string;
  weight: string;
  support: Support;
  percent: number;
}

export enum Support {
  Abstain = "ABSTAIN",
  Against = "AGAINST",
  For = "FOR",
}
