export interface IGetAllOffChainProposals {
  api: "TALLY" | "SNAPSHOT";
  proposals: IOffChainProposal[];
}

export interface IOffChainProposal {
  id: string;
  ipfs: string;
  title: string;
  body: string;
  start: number;
  end: number;
  state: string;
  author: string;
  created: number;
  choices: string[];
  space: Space;
  scores_state: string;
  scores_total: number;
  scores: number[];
  votes: number;
  quorum: number;
  symbol: string;
  flagged: boolean;
}

export interface Space {
  id: string;
  name: string;
  members: any[];
  avatar: string;
  symbol: string;
  verified: boolean;
  turbo: boolean;
  plugins: Plugins;
}

export interface Plugins {
  oSnap: OSnap;
}

export interface OSnap {}
