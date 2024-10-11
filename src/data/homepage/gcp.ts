export const GCP_Homepage = {
  team: [
    {
      name: "krst",
      designation: "Designation",
      x: "https://twitter.com/krst",
      image: "/gcp/team/1.png",
    },
    {
      name: "JoJo",
      designation: "Designation",
      x: "https://twitter.com/krst",
      image: "/gcp/team/2.png",
    },
    {
      name: "Bob-Rossi",
      designation: "Designation",
      x: "https://twitter.com/krst",
      image: "/gcp/team/3.png",
    },
    {
      name: "limes",
      designation: "Designation",
      x: "https://twitter.com/krst",
      image: "/gcp/team/4.png",
    },
    {
      name: "coinflip",
      designation: "Designation",
      x: "https://twitter.com/krst",
      image: "/gcp/team/5.png",
    },
  ],
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
