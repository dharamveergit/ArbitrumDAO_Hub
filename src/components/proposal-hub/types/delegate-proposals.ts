export interface DelegateProposals {
  api: "TALLY" | "SNAPSHOT";
  proposals: Proposal[];
}

export interface Proposal {
  id: string;

  description: string;
  block: Block;
  proposer: Proposer;
  start: Block;
  statusChanges: StatusChange[];
  voteStats: VoteStat[];
  tallyProposal: TallyProposal;
  participationType: ParticipationType;
}

export interface Block {
  timestamp: Date;
}

export enum ParticipationType {
  Notvoted = "notvoted",
  Votedagainst = "votedagainst",
  Votedfor = "votedfor",
  VotedAbstain = "votedabstain",
}

export interface Proposer {
  address: string;
}

export interface StatusChange {
  type: Type;
}

export enum Type {
  Active = "ACTIVE",
  Defeated = "DEFEATED",
  Executed = "EXECUTED",
  Pending = "PENDING",
  Queued = "QUEUED",
  Succeeded = "SUCCEEDED",
}

export interface TallyProposal {
  id: string;
  status: Status;
}

export enum Status {
  Confirmed = "CONFIRMED",
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
