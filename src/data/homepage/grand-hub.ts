export const grandHub = {
  title: "Arbitrum DAO Grant Hub",

  description:
    "The one-stop destination to discover Arbitrum DAO's grants program and the impactful projects that have gained financial support aligned with the Arbitrum DAO's mission.",
  buttons: [
    {
      link: "#grand-programs",
      text: "View Grant Program Allocators",
      type: "default",
    },
    {
      link: "#apply-now",
      text: "How to Apply",
      type: "secondary",
    },
    {
      link: "/ecosystem-hub/grant-projects/all",
      text: "Accepted Projects",
      type: "secondary",
    },
  ],

  intro: {
    title: "What are Arbitrum DAO Grants?",
    description:
      "The Arbitrum DAO Grant Program supports community members by providing financial assistance for projects that enhance the Arbitrum DAO platform. Grants are not loans and do not require repayment. Instead, they are tied to project milestones, ensuring funds are used efficiently to accelerate growth. This encourages innovation and fosters a vibrant ecosystem aligned with Arbitrum DAO's expansion goals. These grants are distributed by teams or program allocators with specific focuses aimed at enhancing Arbitrum DAO.",
    image: "/images/grant-hub/intro.svg",
    icons: [
      {
        title: "Financial support",
        image: "/images/grant-hub/financial-support.svg",
      },
      {
        title: "Community recognition",
        image: "/images/grant-hub/community-recognition.svg",
      },
      {
        title: "Network access",
        image: "/images/grant-hub/network-access.svg",
      },
    ],
  },
  apply: {
    title: "Who Can Apply?",
    description:
      "Passionate developers, researchers, designers, or community builders with groundbreaking ideas to advance the Arbitrum DAO ecosystem are encouraged to apply.",
    image: "/images/grant-hub/intro.svg",
    icons: [
      {
        title:
          "An individual or team with a clear vision and technical expertise",
        image: "/images/grant-hub/group.svg",
      },
      {
        title:
          "Committed to building open-source and community-driven projects.",
        image: "/images/grant-hub/code.svg",
      },
      {
        title:
          "Passionate about contributing to the growth and future of Arbitrum",
        image: "/images/grant-hub/growth.svg",
      },
    ],
    buttons: [
      {
        text: "Learn More",
        link: "https://www.notion.so/Submission-Guidelines-5250083006c942d1a371ef0a85cd1b24?pvs=21",
        type: "secondary",
      },
    ],
  },
  howToApply: {
    title: "How to apply for a grant?",
    telegramLink: "https://t.me/+DQn51hWOIUg0NTQx",
    learnMore:
      "https://arbitrumfoundation.notion.site/How-to-Apply-aa02ac71977b42b3a5852774d2d1fb8d",
    icons: [
      {
        title: "Choose Your Path",
        points: [
          "Foundation: Structured,focused on dApps & tools",
          "DAO: Flexible, community-driven",
          "Programs: Targeted support, like DIA Gasdrop",
        ],
        image: "/images/grant-hub/click.svg",
      },
      {
        title: "Check Eligibility",
        points: [
          "Check Eligibility",
          "Read requirements carefully to avoid disqualification.",
        ],
        image: "/images/grant-hub/check.svg",
      },
      {
        title: "Craft Your Proposal",
        points: [
          "Problem & Solution: Briefly explain your project's magic.",
          "Tech & Roadmap: Outline your build plan.",
          "Team Power: Show off your relevant expertise.",
          "Funding Request: Specify amount & impact.",
        ],
        image: "/images/grant-hub/pen.svg",
      },
      {
        title: "Get Feedback & Submit",
        points: [
          "Refine your pitch with community help.",
          "Submit on their platform & grant your project life!",
        ],
        image: "/images/grant-hub/message.svg",
      },
    ],
  },
  grandPrograms: {
    title: "DAO Grant Allocators",
  },
  questions: [
    {
      question: "How much is the average grant request, and over how long?",
      answer: `<ul class="flex flex-col gap-1 font-os  list-disc pl-5">
         
          <li> While there are no minimum or maximum funding sizes, most approved grants fall within $10,000.00 to $150,000.00 in ARB tokens.
          </li>   <li> Grant payments are tied to project growth, with the majority of funding gated behind the achievement of KPI-based milestones (Milestones Guidance). Most grants aim to achieve their request milestones between two to six months of funding.
          </li>  <li>  Larger grant requests are subject to a more rigorous assessment process, and in many cases, would be more appropriately sourced from different funding channels, including but not limited to VCs and/or going through the DAO governance process via a non-constitutional proposal for a grant from DAO Treasury</li>.
          </ul>`,
    },
    {
      question: "How do I apply for a grant?",
      answer: `
          <p >We have outlined the process <a href="#apply-now" class="underline">here</a>, where you can better understand what will be required. Once you are ready to submit an application, be sure to fill out the @Grant Application Form. <a
            href="https://arbitrumfoundation.notion.site/Grant-Application-Form-de318b3dfaea409abbf424c958b3724b" class="underline "
          >@Grant Application Form.</a></p>
          `,
    },
    {
      question:
        "How far into development should my project be before applying for a grant?",
      answer:
        "<p >Grants can be submitted for projects at any stage of the development life cycle. Successful applicants will need to demonstrate their ability to deliver on milestones and KPIs - many applicants will find this easier once they can show a track record of success (either through development within their current project, or past success in previous projects). </p>",
    },
    {
      question: "Who qualifies for a grant?",
      answer:
        "<p class=''>Any projects building applications or integrations on Arbitrum can be eligible for a grant! The Arbitrum Foundation has a number of Current Phase Categories where additional grant applications are encouraged, however, any grants can be submitted. Refer to the <a href='https://arbitrumfoundation.notion.site/Submission-Guidelines-5250083006c942d1a371ef0a85cd1b24' class='underline'>Submission Guidelines</a> for additional support on how to prepare grant applications with the highest likelihood of success and which restrictions apply on projects ineligible for grants.</p>",
    },
    {
      question: "Are there application deadlines ?",
      answer:
        "<p >Grants are provided on a rolling basis with no application deadlines, however, there will be Grant Moratorium periods during the year where additional applications will be frozen. These will be announced and disclosed throughout the Notion page.</p>",
    },
  ],
};
