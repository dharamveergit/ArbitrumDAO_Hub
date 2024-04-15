export const GetOffChainProposalsDocument = `
    query Proposals($first: Int!, $skip: Int!, $state: String!, $space: String, $space_in: [String], $author_in: [String], $title_contains: String, $space_verified: Boolean, $flagged: Boolean) {
        proposals(
          first: $first
          skip: $skip
          where: {space: $space, state: $state, space_in: $space_in, author_in: $author_in, title_contains: $title_contains, space_verified: $space_verified, flagged: $flagged}
        ) {
          id
          ipfs
          title
          body
          start
          end
          state
          author
          created
          choices
          space {
            id
            name
            members
            avatar
            symbol
            verified
            turbo
            plugins
          }
          scores_state
          scores_total
          scores
          votes
          quorum
          symbol
          flagged
        }
      }
    `;
