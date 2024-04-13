export interface IReceivedDelegations {
  api: "TALLY" | "SNAPSHOT";
  delegators: Delegators;
  organization: Organization;
}

export interface Delegators {
  nodes: Node[];
  pageInfo: PageInfo;
}

export interface Node {
  delegator: Delegator;
  blockNumber: number;
  blockTimestamp: Date;
  votes: string;
}

export interface Delegator {
  address: string;
  name: Ens;
  picture: null;
  twitter: string;
  ens: Ens;
}

export enum Ens {
  ConsuEth = "consu.eth",
  Empty = "",
  TunchEth = "tunch.eth",
}

export interface PageInfo {
  firstCursor: string;
  lastCursor: string;
}

export interface Organization {
  metadata: Metadata;
  name: string;
  id: string;
}

export interface Metadata {
  icon: string;
}
