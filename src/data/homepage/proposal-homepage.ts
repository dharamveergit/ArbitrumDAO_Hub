export const Proposal_Resources = {
  title: "Arbitrum DAO Proposal Resources",
  description:
    "Arbitrum DAO proposals play a pivotal role in shaping the future of our decentralized ecosystem. Whether you're a seasoned developer or a curious enthusiast, this resource hub serves as your gateway to understanding and participating in the proposal process.",

  steps: [
    {
      title: "Threshold Requirement for Proposing",

      description: [
        {
          title: "Snapshot poll",
          description:
            "Have a delegated voting power at least 0.01% threshold of the total votable tokens or ask a delegate to propose on your behalf with the threshold tokens in the chosen DAO. Check the specific DAO for exact requirements.",
        },
        {
          title: "Tally proposal submission",
          description:
            "Possess threshold tokens of atleast 1,000,000 tokens or ask a delegate to propose on your behalf with the threshold tokens (approximate 0.1% of votable tokens) within the DAO. Remember, these requirements may vary per DAO.",
        },
      ],

      cards: [
        {
          icon: "/images/proposal-hub/TallyLogo.png",
          title: "Tally",
          description:
            "Tally is the on-chain governance platform used by the Arbitrum DAO community for voting on proposals.",
          link: "https://www.tally.xyz/gov/arbitrum",
        },
        {
          icon: "/images/proposal-hub/SnapshotLogo.png",
          title: "Snapshot",
          description:
            "Snapshot is the off-chain governance forum where community members can signal support for proposals.",
          link: "https://snapshot.org/#/arbitrumfoundation.eth",
        },
      ],
    },

    {
      title: "Forum Submission",

      description: [
        {
          title: "Craft your proposal",
          description:
            "The process kicks off with the submission of a proposal on the community forum. Explain your idea clearly and concisely using the DAO forum template. Highlight its goals, benefits, and potential risks. This platform serves as a central hub for presenting ideas and receiving initial feedback.",
        },
        {
          title: "Community Engagement",
          description:
            "Members of the community actively engage with the proposal by providing comments and suggestions on the forum. This collaborative phase allows for the incorporation of diverse perspectives.",
        },
      ],

      cards: [
        {
          icon: "/images/proposal-hub/arbitrumlogo.png",
          title: "Arbitrum DAO Forum",
          description:
            "An online community dedicated to discussion, support, and development around the Arbitrum scaling solution for Ethereum. A virtual hub for Arbitrum enthusiasts to connect, ask questions, and collaborate on building innovative applications.",
          link: "https://forum.arbitrum.foundation/",
        },
        {
          icon: "/images/proposal-hub/FilePad.svg",
          title: "Arbitrum DAO Proposal Template",
          description:
            "This template on the Arbitrum DAO forum guides you through outlining your idea clearly, ensuring it adheres to community standards.",
          link: "https://docs.arbitrum.foundation/how-tos/create-submit-dao-proposal#proposal-structure",
        },
      ],
    },

    {
      title: "Gauge Community Interest (Temperature Check)",

      description: [
        {
          title: "Get community feedback",
          description: `Design a simple Snapshot poll with clear options like "Support," "Neutral," and "Oppose." Gauge community sentiment.  <br/> Run the poll for one week: Gather valuable feedback. If the majority signals approval, the proposal progresses to the next step.`,
        },
      ],

      cards: [
        {
          icon: "/images/proposal-hub/SnapshotLogo.png",
          title: "Snapshot",
          description:
            "Launch a quick Snapshot poll with simple options, gather valuable feedback, and gauge community sentiment in just one week.",
          link: "https://snapshot.org/#/arbitrumfoundation.eth/create",
        },
      ],
    },

    {
      title: "Submit your proposal on-chain  (if Step2 passes)",

      description: [
        {
          title: "Token requirement",
          description: `Ensure you hold at least 1,000,000 tokens to submit a proposal on Tally or ask a Delegate to propose on your behalf.`,
        },
        {
          title: "Submit on Tally",
          description: `Submit your proposal on Tally! Connect your wallet with enough tokens, navigate to the Arbitrum DAO page, choose the right governor, craft your title, description, and actions, then double-check everything before making it official on the blockchain.`,
        },
      ],

      cards: [
        {
          icon: "/images/proposal-hub/TallyLogo.png",
          title: "Tally",
          description:
            "Tally is the on-chain governance platform used by the Arbitrum DAO community for voting on proposals.",
          link: "https://www.tally.xyz/gov/arbitrum",
        },
      ],
    },

    {
      title: "Vote and see your proposal implemented",

      description: [
        {
          title: "Community votes",
          description: `Token holders can vote "For" or "Against" your proposal using their tokens on Tally.`,
        },
        {
          title: "Meeting voting thresholds",
          description: `Your proposal needs to reach the minimum voting threshold (5% or 3%, depending on the proposal type) to be valid.`,
        },
        {
          title: "Implementation of actions",
          description: `If your proposal passes the vote and meets the threshold, the defined actions will be executed after a specific delay period.`,
        },
        {
          title: "Delegate Assistance",
          description: `If participants encounter challenges meeting the threshold requirement, they have the option to ask or request assistance from one of the delegates. Delegates play a crucial role in facilitating the proposal process.`,
        },
      ],

      cards: [
        {
          icon: "/images/proposal-hub/FilePad.svg",
          title: "Introduction to the Arbitrum DAO",
          description:
            "This document acts as your gateway to understanding the Arbitrum DAO. Learn how proposals are made, voted on, and implemented.",
          link: "https://docs.arbitrum.foundation/how-tos/create-submit-dao-proposal",
        },

        {
          icon: "/images/proposal-hub/FilePad.svg",
          title: "Arbitrum Improvement Proposals (AIPs)",
          description:
            " Explore the different proposal types (constitutional vs. non-constitutional), stages of an AIP's journey (drafting, discussion, voting), and the anatomy of each proposal",
          link: "https://docs.arbitrum.foundation/dao-glossary#arbitrum-improvement-proposal-aip",
        },
      ],
    },
  ],

  learn: {
    title: "Learn",

    cards: [
      {
        icon: "/images/proposal-hub/FilePad.svg",
        title: "Documentation",
        description:
          "Dive into the extensive documentation to understand Arbitrum DAO's protocols, features, and integrations.",
        url: "https://docs.arbitrum.foundation/gentle-intro-dao-governance",
      },
      {
        icon: "/images/proposal-hub/FileAdd.svg",
        title: "Contribution Page",
        description:
          "Discover opportunities to contribute to Arbitrum DAO's development. Join us in shaping the future of Arbitrum DAO.",
        url: "/community-hub/contributions/guides",
      },
      {
        icon: "/images/proposal-hub/arbitrumlogo.png",
        title: "Arbitrum Portal",
        description:
          "The Arbitrum Portal serves as a centralized hub for accessing various resources, community forums, events, and announcements related to Arbitrum DAO's ecosystem.",
        url: "https://portal.arbitrum.io/",
      },
    ],
  },

  questions: [
    {
      question: "What is the Proposal Process in Arbitrum DAO?",
      answer: `Arbitrum DAO's proposal process requires a minimum token holding, distinguishing between Constitutional and non-Constitutional proposals. AIPs should be well-structured with sections like Abstract and Specifications. If rejected, proposals can be resubmitted with changes and explanations. Code changes necessitate pre-proposal code submission. In essence, the process involves meeting criteria, crafting structured proposals, resubmitting as needed, and providing necessary code for implementation.`,
    },
    {
      question: "Who Can Submit Proposals in Arbitrum DAO?",
      answer: `In Arbitrum DAO, to submit proposals, individuals with an Ethereum wallet address representing at least 1,000,000 tokens (approximately 0.1% of votable tokens) can participate in the proposal process`,
    },
    {
      question: "What Types of Proposals Are Accepted in Arbitrum DAO?",
      answer: `In Arbitrum DAO, various types of proposals are accepted, including Constitutional and non-Constitutional proposals. Constitutional proposals modify the text or procedures of the Constitution or AIP-1, while non-Constitutional proposals cover other types like fund requests or community guidelines`,
    },
    {
      question: "Can I Propose Changes to Existing Protocols or Features",
      answer: `Yes, you can propose changes to existing protocols or features. In the context of Arbitrum DAO, individuals can submit Arbitrum Improvement Proposals (AIPs) to suggest modifications or enhancements to the network's governance, smart contract lockup schedules, spending, budget transparency, and more. These proposals allow community members to actively participate in shaping the evolution of the protocol and its features.`,
    },
    {
      question: "How Can I Participate in Proposal Discussions?",
      answer: `To participate in proposal discussions in Arbitrum DAO, you can create a new topic in the forum under the Proposal Discussion category. By titling your post with [RFC] - Your Team Name - Your Proposal Title and linking to the post in a comment below, you can increase discoverability and engage with the community. Additionally, you can reach out to the facilitators for any questions or assistance in engaging with the proposals.`,
    },
  ],
};

export const Proposal_Homepage = {
  title: "Proposals",
  description:
    "Explore and engage with proposals shaping Arbitrum DAO's future—vote, discuss, and contribute to community-driven initiatives and governance decisions.",
  buttons: [
    // {
    //   type: "default",
    //   link: "/proposal-hub/status",
    //   text: "View Current Proposals",
    // },
  ],

  getStarted: {
    title: "Get Started with Proposals in Arbitrum DAO Ecosystem",
    description:
      "Welcome to the Proposal Hub, the central hub for engaging with proposals. Stay informed about the newest proposals, voting outcomes, delve into the delegate hub, and access real-time updates on delegate and proposal statuses.",
    cards: [
      {
        label: "Introduction",
        description:
          "Proposals represent community-driven initiatives aimed at improving the ecosystem. These initiatives span protocol development, integration, and liquidity enhancement. Proposals undergo community review and voting through platforms like Tally and Snapshot. Successful proposals receive rewards, recognition, and opportunities for collaboration within the Arbitrum DAO community. This process fosters innovation and growth, driving the evolution of Arbitrum DAO towards a more robust and inclusive decentralized ecosystem.",

        image: "/images/proposal-hub/home/introduction.png",
      },
      {
        label: "Submitting a Proposal",
        description: `To submit a proposal in Arbitrum DAO, you can create an on-chain proposal using Tally. First, log in to Tally using the wallet that represents the $ARB tokens. Then, navigate to the "explore DAOs" section or click on "My DAOs" within your Tally profile and select "Create new proposal." Choose the appropriate governor for your proposal: Arbitrum DAO Core for Constitutional Proposals or Arbitrum DAO Treasury for non-Constitutional Proposals. Give the proposal a name and description, and, if needed, a preview image. After submitting your proposal, it will go through a temperature check on Snapshot. Once it passes the temperature check, you can cast your vote on Tally`,

        image: "/images/proposal-hub/home/submitting-proposal.png",
      },
      {
        label: "Evaluation and Approval Process",
        description: `The evaluation and approval of a proposal in the Arbitrum DAO involve a multi-step process. First, the proposal is suggested on the Arbitrum DAO governance forum, and a Snapshot poll is created to gauge the interest of DAO members. The proposal is then discussed and debated for one week, and if it passes the temperature check, it moves on to the formal AIP and call for voting. The AIP is submitted via governance contracts on Arbitrum One via Tally's user interface, and after three days, the voting period begins. A proposal passes if more votes are cast in favor than against, and the total number of votes cast in favor is at least 5% for a Constitutional AIP or 3% for a non-Constitutional AIP of the votable tokens. The DAO always reserves the right to approve any proposal, aligned or not.`,

        image: "/images/proposal-hub/home/evaluation-and-aprroval.png",
      },
      {
        label: "Community Participation",
        description: `To participate in a proposal in the Arbitrum DAO, community members can follow a few steps. First, the proposal is suggested on the Arbitrum DAO governance forum, and a Snapshot poll is created to gauge the interest of DAO members. The proposal is then discussed and debated for one week, and if it passes the temperature check, it moves on to the formal AIP and call for voting. During the discussion period, community members can provide feedback and participate in the discussion to help shape the proposal. The forum submission for any given proposal will usually include a link to a Snapshot poll that community members can participate in. Once the proposal moves to the voting stage, community members can cast their vote by following the prompts within Snapshot's UI or Tally's interface, depending on the proposal's stage. It's important to be an active participant in the DAO's decision-making process by voting on proposals and providing feedback`,

        image: "/images/proposal-hub/home/community-participation.png",
      },
    ],
  },

  questionsTabs: [
    {
      label: "Forum",
      miniTitle: "How to vote?",
      title: "Forums: Collaborative Community Spaces",
      description:
        "Forums serve as vibrant hubs of discussion and collaboration within the Arbitrum DAO community. They provide spaces where community members, developers, and stakeholders can engage in open dialogue, share ideas, and discuss proposals. Forums enable participants to express their opinions, offer feedback, and contribute to the evolution of the ecosystem in a transparent and inclusive manner.",
      cta: {
        label: "Visit Arbitrum Forums",
        url: "https://forum.arbitrum.foundation/c/proposals/7",
      },
      image: {
        src: "/images/proposal-hub/home/get-started-forum.png",
      },
    },
    {
      label: "Snapshot",
      miniTitle: "How to vote?",
      title: "Snapshot: Decentralized Voting Tool",
      description:
        "Snapshot is a decentralized off-chain governance tool that allows token holders to signal their preferences on various proposals without having to move their tokens. Users participate in Snapshot by connecting their wallets and using their tokens to cast votes on proposals. The amount of influence a user has in Snapshot is directly proportional to the number of tokens they hold in their connected wallet for the relevant governance token of the project being voted on. Therefore, users can participate in Snapshot governance by holding tokens associated with projects that utilize Snapshot for decentralized decision-making.",
      cta: {
        label: "Visit Snapshot",
        url: "https://snapshot.org/#/arbitrumfoundation.eth",
      },
      image: {
        src: "/images/proposal-hub/home/get-started-snapshot.png",
      },
    },
    {
      label: "Tallly",
      miniTitle: "How to vote?",
      title: "Tally: On-Chain Governance Platform",
      description:
        "Tally is Arbitrum DAO's on-chain governance platform designed to facilitate decentralized decision-making within the ecosystem. It allows token holders to participate in important governance processes such as voting on proposals, protocol upgrades, and funding allocations. Through Tally, token holders can delegate their voting power to representatives known as delegates, who then cast votes on their behalf. Delegates play a crucial role in representing the interests of the community and ensuring transparency and accountability in governance decisions.",
      cta: {
        label: "Visit Tally",
        url: "https://www.tally.xyz/gov/arbitrum/proposals",
      },
      image: {
        src: "/images/proposal-hub/home/get-started-tally.png",
      },
    },
  ],

  questions: [
    {
      question: "What kinds of proposals can be submitted?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
    {
      question: "How do I submit a proposal?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
    {
      question: "How are proposals reviewed and approved?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
    {
      question: "Can I contribute to discussions on proposals?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
    {
      question: "What happens after a proposal is approved?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
  ],

  howToSubmitProposal: {
    steps: [
      {
        title: "Ideation",
        points: [
          "Start a Forum discussion for the proposal idea to take feedback",
          "Engage with the community",
        ],
        image: "/images/grant-hub/pen.svg",
      },
      {
        title: "Prerequisites​",
        points: [
          "Have 0.01% of threshold votable tokens for Snapshot poll.",
          "If you don’t possess voting threshold (about 0.1% of votable tokens) for Tally, ask delegates to propose on behalf of you.",
        ],
        image: "/images/grant-hub/pen.svg",
      },
      {
        title: "Formal temperature check with a Snapshot poll",
        points: [
          "Post your proposal on the DAO forum.",
          "Create a poll on Snapshot to gauge interest.",
          "Revise proposal based on community feedback.",
        ],
        image: "/images/grant-hub/message.svg",
      },
      {
        title: "On-chain Proposal Submission",
        points: [
          "If proposal passes check, submit on-chain with Tally.",
          "1M threshold voting power or take help from from delegates who can propose on behalf of you",
          "Provide proposal details, Preview and submit.",
        ],
        image: "/images/grant-hub/click.svg",
      },

      {
        title: "Proposal Voting",
        points: [
          "Proposal passes if more votes are for than against.",
          "Total votes must meet threshold (5% for Constitutional AIPs, 3% for non-Constitutional AIPs).",
          "If passes, actions executed after delay.",
        ],
        image: "/images/grant-hub/message.svg",
      },

      {
        title: "Post-Proposal Evaluation",
        points: [
          "If proposal fails, consider resubmission",
          "Incorporate feedback before resubmitting.",
        ],
        image: "/images/grant-hub/check.svg",
      },
    ],
  },
};
