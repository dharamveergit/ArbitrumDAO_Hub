export interface DelegatesData {
  api: "TALLY" | "SNAPSHOT";
  delegates: Delegates;
  governance: Governance;
}

export interface Delegates {
  nodes: Delegate[];
  pageInfo: PageInfo;
}

export interface Governance {
  id: string;
  tokens: Token[];
}

export interface Token {
  symbol: string;
  decimals: number;
}

export interface Delegate {
  id: string;
  votesCount: string;
  account: Account;
  delegatorsCount: number;
  statementV2: StatementV2;
}

export interface Account {
  address: string;
  bio: string;
  name: string;
  picture: null | string;
  twitter: string;
}

export interface StatementV2 {
  statementSummary: string;
}

export interface PageInfo {
  firstCursor: string;
  lastCursor: string;
}
