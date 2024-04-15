export const developerHomepage = {
  title: "Developer Hub",
  description:
    "Welcome to a Comprehensive Developer Hub consolidating frameworks, technologies, and tools, empowering developers with a curated handbook into Arbitrum's ecosystem.",
  frameworks: {
    subTitle: "Development Frameworks",
    title: "Build Your Arbitrum DApp with Ease",
    description:
      "Ready to unleash your DApp potential on Arbitrum? Choose the right framework for your needs and coding style! Here's a glimpse at some popular options",
    cards: [
      {
        title: "Hardhat",
        description:
          "Hardhat streamlines Ethereum, Arbitrum, and EVM development by simplifying smart contract creation, testing, and debugging with robust features.",
        image: "/images/developer-hub/framework/hardhat.png",
        url: "https://hardhat.org/",
      },

      {
        title: "Foundry",
        description:
          "Foundry is a Rust-based toolkit for EVM application development, simplifying smart contract creation, testing, and deployment with user-friendly features.",
        image: "/images/developer-hub/framework/foundry.png",
        url: "https://book.getfoundry.sh",
      },

      {
        title: "thirdweb",
        description:
          "thirdweb SDK simplifies web3 development by covering wallet integration, blockchain interaction, decentralized storage, authentication, and more for EVM-compatible blockchains.",
        image: "/images/developer-hub/framework/third-web.png",
        url: "https://portal.thirdweb.com/contracts/interact/overview",
      },
      {
        title: "Brownie",
        description:
          "Brownie is a Python-based development and testing framework for Ethereum, Arbitrum, and EVM-based blockchains, offering a user-friendly environment for DApp development.",
        image: "/images/developer-hub/framework/brownie.png",
        url: "https://github.com/eth-brownie/brownie",
      },
    ],
  },
  dapps: {
    subTitle: "Build dapps",
    title: "Solidity for Arbitrum DApps",
    description:
      "Solidity, the bedrock of smart contracts, empowers you to create innovative and secure applications on the high-performance Arbitrum network. Delve into its depths and unleash your DApp potential!",
    url: "https://docs.arbitrum.io/for-devs/quickstart-solidity-hardhat",
    cards: [
      {
        title: "Secure",
        description:
          "Mitigate vulnerabilities and build robust contracts with best practices and security-focused tools.",
        image: "/images/developer-hub/dapps/secure.svg",
      },
      {
        title: "Modular",
        description:
          "Organize code effectively through inheritance and libraries, ensuring maintainability and reusability.",
        image: "/images/developer-hub/dapps/tweaks.svg",
      },
      {
        title: "Efficient",
        description:
          "Optimize gas usage for cost-effective transactions and optimize user experience.",
        image: "/images/developer-hub/dapps/custom.svg",
      },
      {
        title: "Flexible",
        description:
          "Tailor contracts to specific needs with a versatile language and rich community resources.",
        image: "/images/developer-hub/dapps/star.svg",
      },
    ],
  },
  stylus: {
    subTitle: "Build dapps",
    title: "Build DApps in Rust using Stylus: Unlocking New Frontiers",
    description:
      "Stylus helps you write smart contracts for the Arbitrum blockchain using Stylus, a platform that leverages the power and efficiency of Rust. Stylus compiles your Rust code into WebAssembly (WASM), resulting in faster execution and lower gas fees compared to traditional Ethereum Virtual Machine (EVM) contracts. Additionally, it maintains interoperability with existing Solidity contracts, offering a flexible development approach.",
    url: "https://docs.arbitrum.io/stylus/stylus-quickstart",
    cards: [
      {
        title: "Rust Integration",
        description:
          "Stylus leverages the familiar syntax and powerful features of Rust, bringing its speed and memory safety to the blockchain world.",
        image: "/images/developer-hub/stylus/rust.svg",
      },
      {
        title: "WebAssembly (WASM) compilation",
        description:
          "Your Rust code gets compiled into efficient WASM, resulting in faster execution and lower gas fees compared to traditional EVM contracts.",
        image: "/images/developer-hub/stylus/wasm.svg",
      },
      {
        title: "Interoperability",
        description:
          "Seamlessly interact with existing Solidity contracts through Stylus's EVM compatibility layer, unlocking a hybrid development approach.",
        image: "/images/developer-hub/stylus/intero.svg",
      },
      {
        title: "Secure by design",
        description:
          "Rust's strong memory management and type system inherently mitigate common vulnerabilities, enhancing contract security.",
        image: "/images/developer-hub/stylus/secure.svg",
      },
    ],
  },
  launch: {
    subTitle: "Launch your own chain",
    title: "Arbitrum Orbit: Crafting Your Custom Blockchain Realm",
    description:
      "With Arbitrum Orbit, design your custom L2 chain, defining governance, security, and user experience. Tailor fees and performance, shaping your decentralized realm's evolution and pushing boundaries.",
    url: "https://docs.arbitrum.io/launch-orbit-chain/orbit-quickstart",
    cards: [
      {
        title: "Tailored Design",
        description:
          "Define your chain's governance model, staking tokens, and validator requirements.",
        image: "/images/developer-hub/launch/design.svg",
      },
      {
        title: "Performance Tweaks",
        description:
          "Adjust gas fees, throughout, and security parameters for a seamless user experience.",
        image: "/images/developer-hub/launch/tweaks.svg",
      },
      {
        title: "Custom Features",
        description:
          "Integrate precompiles, data availability layers, and other functionalities to fit your vision.",
        image: "/images/developer-hub/launch/custom.svg",
      },
      {
        title: "Be Your Own Boss",
        description:
          "Take full control over your chain's operation, decision-making, and future direction.",
        image: "/images/developer-hub/launch/star.svg",
      },
    ],
  },
  tokenBridge: {
    subTitle: "Token Bridging",
    title: "Seamless Asset Flow with Arbitrum's Token Bridges",
    description:
      "Moving assets between Ethereum and Arbitrum seamlessly? Look no further! Explore the diverse bridging solutions offered by Arbitrum, unlocking interoperability and maximizing opportunities for your DApps. Think of token bridging as the magic tunnel connecting Ethereum and Arbitrum. It allows you to effortlessly transfer your valuable ERC-20 tokens between these two environments.",
    url: "https://docs.arbitrum.io/build-decentralized-apps/token-bridging/overview",
    cards: [
      {
        title: "DApp Integration",
        description:
          "Bring existing Ethereum tokens to Arbitrum's fast and cost-effective ecosystem.",
        image: "/images/developer-hub/bridge/dapp.svg",
      },
      {
        title: "Liquidity Expansion",
        description:
          "Reach a wider user base and increase liquidity for your DApp's tokens.",
        image: "/images/developer-hub/bridge/expansion.svg",
      },
      {
        title: "Risk Management",
        description:
          "Move funds between chains strategically to optimize returns and manage exposure.",
        image: "/images/developer-hub/bridge/management.svg",
      },
    ],
  },
  questions: [
    {
      question: "What are the prerequisites for developing on Arbitrum?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
            <li >Basic understanding of blockchain technology and smart contracts.</li>
            <li >Familiarity with Solidity or another supported language.</li>
            <li >Node.js and npm or yarn installed.</li>
            <li class="text-sm md:text-base lg:text-lg ">A suitable code editor or IDE.</li>
          </ul>`,
    },
    {
      question: "How do I deploy my smart contracts to Arbitrum?",
      answer: `
          <p >You can deploy your contracts using tools like Hardhat with the Arbitrum RPC endpoint. Refer to the docs for specific instructions:  <a
            target="_blank" 
          href="https://docs.arbitrum.io" class="underline "
          >https://docs.arbitrum.io</a></p>
          `,
    },
    {
      question:
        "  What are the best practices for writing secure smart contracts on Arbitrum?",
      answer:
        "<p >Always follow secure coding practices and utilize established libraries and audits for your contracts.</p>",
    },
    {
      question: "How does Arbitrum handle data availability and fraud proofs?",
      answer:
        "<p class=''>Arbitrum uses Sequencers for data availability and validators for fraud proofs. Learn about these roles and their impact on your application.</p>",
    },
    {
      question:
        "Where can I find resources to debug and troubleshoot issues with my Arbitrum applications?",
      answer:
        "<p >The Arbitrum developer docs offer troubleshooting guides and community forums provide support. Consider using tools like Etherscan and Hardhat debugging functionalities.</p>",
    },
  ],
};
