import { governanceId } from "../fetcher";

export const ProposalsDocument = `query Proposals($chainId: ChainID!, $pagination: Pagination, $sort: ProposalSort) { 
    proposals(chainId: $chainId, pagination: $pagination, sort: $sort) {
      id
      title
      eta
      governor {
        name
      }
      voteStats {
        support
        weight
        votes
        percent
      }
    }
}
`;

export const GetDelegates = `
query Delegates($delegatesInput: DelegatesInput!) {

  governance(id: "${governanceId}") {
    id
    tokens {
      symbol
      decimals
      
    }
  }
  
  delegates(input: $delegatesInput) {
    nodes {
      ... on Delegate {
        id
        votesCount
      
        account {
     
          address
          bio
          name
          picture
          twitter
        }
        votesCount
        delegatorsCount
        statementV2 {
          statementSummary
        }
      }
    }
    pageInfo {
      firstCursor
      lastCursor
    }
  }
}

`;

export const GetTokenStats = `
query GovernanceDelegatesSummary($governanceId: AccountID!) {
  governance(id: $governanceId) {
    id
    name
    chainId
    stats {
      tokens {
        owners
        voters
        supply
        delegatedVotingPower
      }
    }
    organization {
      name
    }
    contracts {
      tokens {
        type
        address
      }
      governor {
        type
      }
    }
    quorum
    parameters {
      ... on GovernorBravoParameters {
        proposalThreshold
      }
      ... on OpenZeppelinGovernorParameters {
        proposalThreshold
      }
      ... on GovernorAlphaParameters {
        proposalThreshold
      }
      ... on GovernorAaveParameters {
        proposalThreshold
      }
      ... on NounsForkGovernorParameters {
        proposalThreshold
      }
    }
    tokens {
      symbol
      decimals
    }
  }
}
`;

export const GetDelegateByAddress = `query DelegateByAddress($delegatesByAddressInput: DelegateInput!, $governorsInput: GovernorsInput!,  $tokenInput: TokenBalanceInput!, $proposalsCountInput: ProposalsCreatedCountInput!) {
  
  delegate(input: $delegatesByAddressInput) {
    id
    delegatorsCount
    statement {
      address
      dataSource
      dataSourceURL
      discourseProfileLink
      discourseUsername
      id
      isSeekingDelegation
      issues {
        id
        name
        organizationId
        description
      }
      organizationID
      statement
      statementSummary
    }
    account {
      proposalsCreatedCount(input: $proposalsCountInput)
      picture
      email
      bio
      address
      ens
      name
      twitter
      features {
        account {
          bio
        }
        enabled
        governance {
          stats {
            tokens {
              voters
            }
          }
        }
        name
        organization {
          metadata {
            icon
          }
        }
      }
    }
    votesCount
    token {
      decimals
      id
      isBehind
      isIndexing
      name
    }
    voteChanges {
      prevBalance
      newBalance
      netChange
      token {
        decimals
        id
        name
      }
      timestamp
    }
  }

   governorsV2(input: $governorsInput) {
    nodes {
      ... on GovernorV2 {
        id
        name
        kind
        quorum
        chainId
        contracts {
          governor {
            address
            type
          }
          tokens {
            address
            type
          }
        }
      }
    }
  }

  tokenBalance(input: $tokenInput) {
    balance
  }


  organization(input: {id: "2206072050315953936"}) {
    id
    name
    slug
    metadata {
      icon
      description
      color
      socials {
        twitter
      }
    }
    myRole
    uxVersion
    votersCount
    chainIds
    creator {
      name
      bio
      email
    }
    proposalsCount
    governances {
      id
      active
      name
      stats {
        proposals {
          total
        }
      }
    }
  }
}`;

export const AddressDAOSProposals = `query AddressDAOSProposals($chainId: ChainID!, $address: Address!, $governanceIds: [AccountID!], $pagination: Pagination) {
  proposals(
    chainId: $chainId
    governanceIds: $governanceIds
    pagination: $pagination
    sort: {order: DESC}
  ) {
    id
    description
    block {
      timestamp
    }
    proposer {
      address
    }
    start {
      ... on Block {
        timestamp
      }
      ... on BlocklessTimestamp {
        timestamp
      }
    }
    statusChanges {
      type
    }
    voteStats {
      votes
      weight
      support
      percent
    }
    tallyProposal {
      id
      status
    }
    participationType(address: $address)
  }
}`;

export const ReceivedDelegationsGovernance = `
query ReceivedDelegationsGovernance($delegationInput: DelegationsInput!) {
  delegators(input: $delegationInput) {
    nodes {
      ... on DelegationV2 {
        delegator {
          address
          name
          picture
          twitter
          ens
        }
        blockNumber
        blockTimestamp
        votes
      }
    }
    pageInfo {
      firstCursor
      lastCursor
    }
  }
  organization(input: {id: "2206072050315953936"}) {
    metadata {
      icon
    }
    name
    id
  }
}
    `;

export const CreatedProposalsQuery = `
query CreatedProposals($proposers: [Address!], $governanceIds: [AccountID!], $pagination: Pagination, $chainId: ChainID!) {
  proposals(
    proposers: $proposers
    governanceIds: $governanceIds
    pagination: $pagination
    chainId: $chainId
    sort: {order: DESC, field: CREATED_AT}
  ) {
    id
    description
    statusChanges {
      type
    }
    block {
      timestamp
    }
    voteStats {
      votes
      weight
      support
      percent
    }
    tallyProposal {
      id
      status
    }
  }

  organization(input: {id: "2206072050315953936"}) {
    id
    name
    slug
    metadata {
      icon
      description
      color
      socials {
        twitter
      }
    }
    myRole
    uxVersion
    votersCount
    chainIds
    creator {
      name
      bio
      email
    }
    proposalsCount
    governances {
      id
      active
      name
      stats {
        proposals {
          total
        }
      }
    }
  }
}
    `;

export const GetAllProposalsQuery = `
query GovernanceProposals($sort: ProposalSort, $chainId: ChainID!, $pagination: Pagination, $governanceIds: [AccountID!], $proposerIds: [AccountID!], $voters: [Address!], $votersPagination: Pagination, $includeVotes: Boolean!) {
  proposals(
    sort: $sort
    chainId: $chainId
    pagination: $pagination
    governanceIds: $governanceIds
    proposerIds: $proposerIds
  ) {
    title
    id
    description
    statusChanges {
      type
    }
    block {
      timestamp
    }
    voteStats {
      votes
      weight
      support
      percent
    }
    votes(voters: $voters, pagination: $votersPagination) @include(if: $includeVotes) {
      support
      voter {
        picture
        address
        identities {
          twitter
        }
      }
    }
    governance {
      id
      quorum
      name
      timelockId
      organization {
        metadata {
          icon
        }
      }
      tokens {
        decimals
      }
    }
    tallyProposal {
      id
      createdAt
      status
    }
  }

  governors(chainIds: [$chainId], ids: $governanceIds) {
    proposalStats {
      passed
      failed
    }
  }
}
`;
