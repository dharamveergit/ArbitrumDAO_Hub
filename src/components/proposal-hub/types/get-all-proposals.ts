export interface IGetAllProposalsQuery {
  api: "TALLY" | "SNAPSHOT";
  proposals: IProposal[];
  governors: Governor[];
}

export interface Governor {
  proposalStats: ProposalStats;
}

export interface ProposalStats {
  passed: number;
  failed: number;
}

export interface IProposal {
  title: string;
  id: string;
  description: string;
  statusChanges: StatusChange[];
  block: Block;
  voteStats: VoteStat[];
  governance: Governance;
  tallyProposal: TallyProposal;
}

export interface Block {
  timestamp: Date;
}

export interface Governance {
  id: string;
  quorum: string;
  name: string;
  timelockId: string;
  organization: Organization;
  tokens: Token[];
}

export interface Organization {
  metadata: Metadata;
}

export interface Metadata {
  icon: string;
}

export interface Token {
  decimals: number;
}

export interface StatusChange {
  type: string;
}

export interface TallyProposal {
  id: string;
  createdAt: Date;
  status: string;
}

export interface VoteStat {
  votes: string;
  weight: string;
  support: string;
  percent: number;
}
