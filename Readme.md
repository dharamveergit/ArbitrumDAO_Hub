# Welcome to ArbitrumHub..

![1beecbc7-1023-45fc-a7fb-be6983747337](https://github.com/HoomanHQ/ArbitrumDAO_Hub/assets/126047668/c6418760-11ed-45de-9582-720e8aad9e7c)

- [Welcome to ArbitrumHub..](#welcome-to-arbitrumhub)
  - [Welcome to Arbitrum Hub](#welcome-to-arbitrum-hub)
  - [How to run ArbitrumHub locally](#how-to-run-arbitrumhub-locally)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Grant Hub](#grant-hub)
    - [How to create a new grant-program under grant-hub](#how-to-create-a-new-grant-program-under-grant-hub)
    - [How to list an accepted project to grant](#how-to-list-an-accepted-project-to-grant)
    - [How to list an accepted project to sub-grant program](#how-to-list-an-accepted-project-to-sub-grant-program)
    - [How to list a project to a allocator](#how-to-list-a-project-to-a-allocator)
    - [how to create an update blog under grant program](#how-to-create-an-update-blog-undergrantprogram)
  - [Community Hub](#community-hub)
    - [Ambassadors](#ambassadors)
      - [How add a new profile to the ambassadors page](#how-add-a-new-profile-to-the-ambassadors-page)
      - [How to add a contribution to the ambassador profile page](#how-to-add-a-contribution-to-the-ambassador-profile-page)
      - [How to add events to the ambassador profile page](#how-to-add-events-to-the-ambassador-profile-page)
      - [How to add achievements to the ambassador profile page](#how-to-add-achievements-to-the-ambassador-profile-page)
    - [Community Events](#community-events)
      - [How to list an event to the events page](#how-to-list-an-event-to-the-events-page)
      - [How to list an hackathon to the hackathon page](#how-to-list-an-hackathon-to-the-hackathon-page)
    - [How to list a collaboration to the collaborations page](#how-to-list-a-collaboration-to-the-collaborations-page)
    - [How to list a job to the jobs page](#how-to-list-a-job-to-the-jobs-page)
    - [How to list a bounty to the bounties page](#how-to-list-a-bounty-to-the-bounties-page)
  - [Blogs](#blogs)
    - [How to write a blog to the blog page](#how-to-write-a-blog-to-the-blog-page)
  - [Working Groups](#working-groups)
    - [how to create a new workgroup](#how-to-create-a-new-workgroup)
    - [how to list the transcripts and notes](#how-to-list-the-transcripts-and-notes)
      - [How to list a note to the meetings page](#how-to-list-a-note-to-the-meetings-page)
      - [How to list a transcript to the meetings page](#how-to-list-a-transcript-to-the-meetings-page)
    - [How to create a project under working group](#how-to-create-a-project-under-working-group)
    - [How to write/update blog under working group](#how-to-writeupdate-blogunderworking-group)
  - [Contact](#contact)

## Welcome to Arbitrum Hub

Introducing ArbitrumHub - Your Gateway to Seamless Navigation and Participation in the ArbitrumDAO Ecosystem

ArbitrumHub is the ultimate DAO synchronization platform designed to streamline your experience within the Arbitrum ecosystem. Embrace community-driven governance with $ARB tokens, wield voting power, and shape network security and evolution. Say goodbye to scattered data and complexity, as ArbitrumHub consolidates essential information, offers user-friendly interfaces, and fosters collaboration for a decentralized financial infrastructure. Join us in navigating the ArbitrumDAO ecosystem effortlessly and shaping its future together.

## How to run ArbitrumHub locally

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install NPM packages
3. ```sh
   npm install
   ```
4. Start the project
5. ```sh
   npm run dev
   ```
6. Open your browser and go to `https://localhost:4321/` 🥳

## [Grant Hub](https://www.arbitrumhub.io/community-hub/grant-hub)

### How to create a new grant-program under [grant-hub](https://www.arbitrumhub.io/community-hub/grant-hub)

1. Add a new file/folder to the `content/Grant_Hub/choose-grant-allocator/grants`
   eg. `content/Grant_Hub/pluralistic/grants/arbitrum-citizen-retro-funding`

```md
---
title: "Pluralistic Labs : Grant Program Allocator"
description: "Calling all innovators! Plurality Labs offers grants to support developers building dApps, infrastructure, and tools that fuel the growth of the Arbitrum DAO ecosystem. Bring your ideas to life and contribute to a thriving community. Apply today and take your project to the next level!"
type: "Home"
image: "./banner.png"
buttons:
  - link: "https://forum.arbitrum.foundation/t/delegated-domain-allocation-by-questbook-arbitrum-dao-grants/14688"
    text: "Learn More"
    type: "secondary"

grants:
  title: Pluralistic Grant Program
  description: "Calling all innovators! Plurality Labs offers grants to support developers building dApps, infrastructure, and tools that fuel the growth of the Arbitrum DAO ecosystem. Bring your ideas to life and contribute to a thriving community. Apply today and take your project to the next level!"
  buttons:
    - link: "/grant-hub/pluralistic/update"
      text: "View Updates"
      type: "default"
update:
  title: "Pluralistic Grant Program"
  description: "Calling all innovators! Plurality Labs offers grants to support developers building dApps, infrastructure, and tools that fuel the growth of the Arbitrum DAO ecosystem. Bring your ideas to life and contribute to a thriving community. Apply today and take your project to the next level!"

overview: "Community-created grant program facilitated by Plurarity Labs as allocators to distribute funds, along with thankarb.com to facilitate participation from the ecosystem."
label: "Managed by Plurality Labs"
points:
  - Decentralized Applications
  - Developer Tools
  - Infrastructure
---

## Write the home page of the grant hub allocator
```

### How to list an accepted project to [grant](https://www.arbitrumhub.io/grant-hub/foundation-grants/grants/)

1. Add a new file/folder to the `content/Grant_Hub/choose-grant-allocator/grants/your-project`
   eg. `content/Grant_Hub/pluralistic/grants/your-project`

```md
---
type: Grant # <- This is the type of the grant and should be Grant
grantType: "Project" # <- This is the grant type and should be Project
title: "0xidm's DAO governance analysis and AIP" # <- This is the title of the grant
status: Completed # <- This is the status of the grant
walletAddress: "0xidm.eth" # <- This is the wallet address of the grant
fundingReceived: $149.67 # <- This is the funding received of the grant
description: "Identified blind spot in STIP data, drafted AIP for resolution, now a live vote on Tally."
date: 2023-11-25
externalUrl: "https://explorer.gitcoin.co/#/round/42161/0x3ac78e1ae5086904d53b41c747188216789f59a7/0x3ac78e1ae5086904d53b41c747188216789f59a7-44"
links:
  twitter: "https://twitter.com/0x_idm"
  website: "https://research.svy.gg/_static/reports/arbitrum-dao-stip-results.html"
  github: "https://github.com/Wizard-Scientific"
  github2: "https://github.com/0xidm"
---
```

### How to list an accepted project to [sub-grant program](https://www.arbitrumhub.io/grant-hub/pluralistic/grants/allo-hackathon/)

1. Add a new file/folder to the `content/Grant_Hub/choose-grant-allocator/grants/choose-grant-program/sub-grants/your-project`
   eg. `content/Grant_Hub/pluralistic/grants/arbitrum-citizen-retro-funding/sub-grants/your-project`

```md
---
type: Grant # <- This is the type of the grant and should be Grant
grantType: "Project" # <- This is the grant type and should be Project
subCollection: retro # <- This is the sub collection of the grant can be or get from the grant hub
title: "0xidm's DAO governance analysis and AIP" # <- This is the title of the grant
status: Completed # <- This is the status of the grant
walletAddress: "0xidm.eth" # <- This is the wallet address of the grant
fundingReceived: $149.67 # <- This is the funding received of the grant
description: "Identified blind spot in STIP data, drafted AIP for resolution, now a live vote on Tally."
date: 2023-11-25
externalUrl: "https://explorer.gitcoin.co/#/round/42161/0x3ac78e1ae5086904d53b41c747188216789f59a7/0x3ac78e1ae5086904d53b41c747188216789f59a7-44"
links:
  twitter: "https://twitter.com/0x_idm"
  website: "https://research.svy.gg/_static/reports/arbitrum-dao-stip-results.html"
  github: "https://github.com/Wizard-Scientific"
  github2: "https://github.com/0xidm"
---
```

### How to list a project to a [allocator](https://www.arbitrumhub.io/community-hub/grant-hub/foundation-grants/)

1. Add a new file/folder to the `content/Grant_Hub/choose-grant-allocator/grants/choose-grant-program/sub-grants/your-project`
   eg. `content/Grant_Hub/pluralistic/grants/arbitrum-citizen-retro-funding/sub-grants/your-project`

```md
---
title: "9VRSE, Inc."
category:
  - "Gaming"
ApprovedOn: "Q4 2023"
externalLink: "#"
type: "Grant"
grantType: "Project"
---
```

### how to create an update blog under grant program

1. Add a new file/folder to the `content/Grant_Hub/choose-grant-allocator/grants/choose-grant-program/updates/your-update`
   eg. `content/Grant_Hub/pluralistic/updates/how-to-add-updates-tutorial`

```md
---
title: "How to add updates tutorial"
label: "UPDATES"
description: "Click this card to access the GitHub repository. Fork the main branch, create your branch, update the grant information, and submit a merge request on the DAO Sync Platform."
image: "./banner.png"
type: "Update"
externalUrl: "https://github.com/ArbitrumHub/ArbitrumHub"
---

## Summary

9VRSE, Inc. is a blockchain technology company that is building a decentralized, scalable, and secure platform for the development of virtual reality (VR) and augmented reality (AR) applications. The company is developing a platform that will enable developers to create and deploy VR and AR applications on the blockchain. The platform will provide developers with the tools and infrastructure they need to build and deploy VR and AR applications, and will also provide users with a secure and scalable environment in which to experience VR and AR content.
```

## [Community Hub](https://www.arbitrumhub.io/community-hub/the-hub/)

### [Ambassadors](https://www.arbitrumhub.io/community-hub/ambassadors/near-you)

#### How add a new profile to the [ambassadors page](https://www.arbitrumhub.io/community-hub/ambassadors/near-you)

1. Add a new file to the `src/content/Community_Ambassadors` folder with the folder as the name of the ambassador. For example, src/content/Community_Ambassadors/profile-name
2. Add the profile.md file under your folder, with the following structure

```md
---
name: "Your Name" # <- This is the name of the ambassador
location: "Your Location" # <- This is the location of the ambassador
description: "Your Description" # <- This is the description of the ambassador
image: "Your Image" # <- This is the image of the ambassador
links: # <- These are the social media links of the ambassador
  twitter: "Your Twitter"
  linkedin: "Your LinkedIn"
  github: "Your GitHub"
---
```

#### How to add a contribution to the ambassador profile page

1. Add a new file to the `content/Community_Ambassadors/profile-name` folder with the folder as the contributions that will look like `content/Community_Ambassadors/profile-name/contributions`
2. Add a file to the folder with the following structure that will look like `content/Community_Ambassadors/profile-name/contributions/contribution-name.md` or `content/Community_Ambassadors/profile-name/contributions/contribution-name/index.md`

```md
---
title: "Arbitrum One vs Nova" # <- This is the title of the contribution
description: "" # <- This is the description of the contribution
image: "./assets/nova.webp" # <- This is the image of the contribution
tag: "Article" # <- This is the tag of the contribution
label: "Written" # <- This is the label of the contribution
date: 2023-11-11 # <- This is the date of the contribution
externalUrl: "https://dablendo.medium.com/an-analogy-of-arbitrum-one-vs-arbitrum-nova-6d4aa88dbac3" # <- This is the external url where the contribution is located this is optional
---
```

#### How to add events to the ambassador profile page

1. Add a new file to the `content/Community_Ambassadors/profile-name` folder with the folder as the contributions that will look like `content/Community_Ambassadors/profile-name/events`
2. Add a file to the folder with the following structure that will look like `content/Community_Ambassadors/profile-name/events/event-name.md` or `content/Community_Ambassadors/profile-name/events/event-name/index.md`

```md
---
title: "Meeting Hooman" # <- This is the title of the event
description: "Uncover the latest in Arbitrum tech, engage with pioneers, and network at our dynamic community meetup" # <- This is the description of the event
label: "Re:Project Update" # <- This is the label of the event
externalUrl: "https://www.youtube.com" # <- This is the external url where the event is located this is optional
date: 2021-10-01 # <- This is the date of the event
---
```

#### How to add achievements to the ambassador profile page

1. Add a new file to the `content/Community_Ambassadors/profile-name` folder with the folder as the contributions that will look like `content/Community_Ambassadors/profile-name/achievements`
2. Add a file to the folder with the following structure that will look like `content/Community_Ambassadors/profile-name/achievements/achievement-name.md` or `content/Community_Ambassadors/profile-name/achievements/achievement-name/index.md`

```md
---
title: "Discover Arbitrudfsdfm" # <- This is the title of the achievement
description: "Uncover the latest in Arbitrum tech, engage with pioneers, and network at our dynamic community meetup" # <- This is the description of the achievement
label: "Re:Project Update" # <- This is the label of the achievement
externalUrl: "https://www.youtube.com" # <- This is the external url where the achievement is located this is optional
---
```

### [Community Events](https://www.arbitrumhub.io/community-hub/initiatives/events/)

#### How to list an event to the [events page](https://www.arbitrumhub.io/community-hub/initiatives/events/)

1. Add a new file/folder to the `content/Community_Events`
   eg. `content/Community_Events/events/consensus`

```md
---
title: "Consensus" # <- This is the title of the event
description: "Consensus is the world's largest, longest-running and most influential gathering that brings together all sides of the cryptocurrency, blockchain and Web3 community." # <- This is the description of the event
image: "./assets/banner.png" # <- This is the image of the event
date: 2024-05-19 # <- This is the date of the event
endDate: 2024-05-31 # <- This is the end date of the event
externalUrl: "https://consensus2024.coindesk.com/" # <- This is the external url where the event is located this is optional
---
```

#### How to list an hackathon to the [hackathon page](https://www.arbitrumhub.io/community-hub/initiatives/hackathons/#sub)

1. Add a new file/folder to the `content/Community_Events`
   eg. `content/Community_Events/hackathons/consensus`

```md
---
title: "Consensus" # <- This is the title of the event
description: "Consensus is the world's largest, longest-running and most influential gathering that brings together all sides of the cryptocurrency, blockchain and Web3 community." # <- This is the description of the event
image: "./assets/banner.png" # <- This is the image of the event
date: 2024-05-19 # <- This is the date of the event
endDate: 2024-05-31 # <- This is the end date of the event
externalUrl: "https://consensus2024.coindesk.com/" # <- This is the external url where the event is located this is optional
---
```

### How to list a collaboration to the [collaborations page](https://www.arbitrumhub.io/community-hub/collaborations)

1. Add a new file/folder to the `content/Community_Collaborations`
   eg. `content/Community_Collaborations/collaborations/consensus`

```md
---
title: Discover Arbitrum # <- This is the title of the collaboration
description: Uncover the latest in Arbitrum tech, engage with pioneers, and network at our dynamic community meetup # <- This is the description of the collaboration
subTitle: Re:Project Update # <- This is the subtitle of the collaboration
date: 2024-01-17 # <- This is the date of the collaboration
---
```

### How to list a job to the [jobs page](https://www.arbitrumhub.io/community-hub/jobs)

1. Add a new file/folder to the `content/Community_Jobs`
   eg. `content/Community_Jobs/jobs/consensus`

```md
---
title: Entry Level Content Writer
description: "Need a content writer to help with a project. Must have experience with React and Solidity."
subTitle: "Content Writer" # <- This is the subtitle of the job
link: "https://www.youtube.com" # <- This is the external url where the job is located
---

### Job Description

We are looking for a web developer to help with a project. The ideal candidate will have experience with React and Solidity. The project involves building a decentralized application that allows users to create, buy, and sell digital cards. The app will be built on the Ethereum blockchain and will use smart contracts to manage the creation and transfer of digital cards. The app is designed to be user-friendly and accessible to users with no prior experience with blockchain technology. The app will be open-source and available on GitHub.

### Requirements

- Experience with React
- Experience with Solidity
- Experience with Ethereum blockchain
- Experience with smart contracts
- Experience with decentralized applications
- Experience with open-source projects
- Experience with GitHub

### How to Apply

If you are interested in this position, please send an email to [
[email protected]
](mailto: [email protected]) with your resume and a link to your GitHub profile. Please include a brief description of your experience with React and Solidity, and any relevant projects you have worked on.

### Compensation
```

### How to list a bounty to the [bounties page](https://www.arbitrumhub.io/community-hub/bounties)

1. Add a new file/folder to the `content/Community_Bounties`
   eg. `content/Community_Bounties/consensus`

```md
---
title: "Fix Bounties Page Meta Data" # <- This is the title of the bounty
date: 2024-02-25 # <- This is the date of the bounty
description: "The bounties page has incorrect meta data. This is a bounty to fix it." # <- This is the description of the bounty
reward: 100 # <- This is the reward of the bounty
link: "https://github.com/HoomanHQ/Arbitrum DAO/issues" # <- This is the link of the bounty
level: "beginner" # <- This is the level of the bounty
---
```

## [Blogs](https://www.arbitrumhub.io/community-hub/blog)

### How to write a blog to the [blog page](https://www.arbitrumhub.io/community-hub/blog)

1. Add a new file/folder to the `content/blogs`
   eg. `content/blogs/consensus/index.md`

```md
---
title: "Introducing Arbitrum Arcade"
description: "Introducing the Arbitrum Arcade, an Onchain Gameathon designed to showcase Web3's most innovative gaming experiences, provide exposure and prizes to up-and-coming content creators, and bring in-game achievements onchain with Clique, built on top of EAS (Ethereum Attestation Service)."
image: "./banner.webp"
tag: "Platform"
label: "arbitrum technology"
pubDate: 2024-02-27
author: "arbitrum"
---

Introducing the Arbitrum Arcade, an Onchain Gameathon designed to showcase Web3's most innovative gaming experiences, provide exposure and prizes to up-and-coming content creators, and bring in-game achievements onchain with [Clique](https://www.clique.tech/), built on top of [EAS](https://attest.org/) (Ethereum Attestation Service).

## Body of the Blog
```

## [Working Groups](https://www.arbitrumhub.io/working-groups)

### how to create a new workgroup

1. Add a new file/folder to the `content/Working_Groups`
   eg. `content/Working_Groups/wg-analytics`

```md
---
title: How to contribute # <- This is the title of the workgroup
description: Click this card to access the GitHub repository. Fork the main branch, create your branch,  update the WG info, and submit a merge request on the DAO Sync Platform. Disclaimer, WG update needs prior approval.
type: "wg" # <- This is the type of the workgroup and should be wg
tag: "Update" # <- This is the tag of the workgroup
githubUrl: "https://github.com"
discordUrl: "https://discord.com"
meetingOn: "N/A"
meetingLink: "https://meet.google.com"
meetingTiming: "N/A"
calendarId: "1ed9e6c0a914d3bf87aed85cbc041cfa3ef33a383e425d88cd3fec67e1057ef6@group.calendar.google.com" # <- This is the calendar id of the workgroup
---

## Member:

- [Member 1](https://github.com)
- [Member 2](https://github.com)
- [Member 3](https://github.com)
- [Member 4](https://github.com)
- [Member 5](https://github.com)

[View All Members](https://github.com)

## Meeting Schedule:

Bi-weekly on Tuesday at 10:00 AM EST

## Communication Channels:

- [GitHub](https://github.com)
- [Discord](https://discord.com)
```

### how to list the transcripts and notes

#### How to list a note to the [meetings page](https://www.arbitrumhub.io/working-groups/wg-analytics/meetings)

1. Add a new file/folder to the `content/Working_Groups`
   eg. `content/Working_Groups/wg-analytics/meetings/17-10-2023/notes.md`

2. Name of the file should be `notes.md`

```md
---
title: "WG Analytics"
date: 2024-02-17
type: "notes"
recordingUrl: "https://www.youtube.com/embed/12345"
---
```

#### How to list a transcript to the [meetings page](https://www.arbitrumhub.io/working-groups/wg-analytics/meetings)

1. Add a new file/folder to the `content/Working_Groups`
   eg. `content/Working_Groups/wg-analytics/meetings/17-10-2023/transcript.md`

2. Name of the file should be `transcript.md`

```md
---
title: "WG Analytics"
date: 2024-02-17
type: "transcript"
recordingUrl: "https://www.youtube.com/embed/12345"
---
```

### How to create a project under [working group](https://www.arbitrumhub.io/working-groups/wg-analytics/projects)

1. Add a new file/folder to the `content/Working_Groups`
   eg. `content/Working_Groups/wg-analytics/projects/robotics`

```md
---
title: How to add Project? # <- This is the title of the project
description: WG members can add projects by forking the main repository, updating the projects folder on the copy, and then submitting a merge request to the main branch. Click on the card to see the repository.
tag: done # <- This is the tag of the project
status: complete # <- This is the status of the project
type: project
externalUrl: https://github.com/ArbitrumHub/ArbitrumHub # <- This is the external url of the project
---
```

### How to write/update blog under [working group](https://www.arbitrumhub.io/working-groups/wg-analytics/contributions)

1. Add a new file/folder to the `content/Working_Groups`
   eg. `content/Working_Groups/wg-analytics/contributions/robotics`

```md
---
---

title: "How to contribute"
description: "Click this card to access the GitHub repository. Fork the main branch, create your branch, update the WG info, and submit a merge request on the DAO Sync Platform. Disclaimer, WG update needs prior approval."
image: "./banner.png"
externalUrl: "https://github.com/ArbitrumHub/ArbitrumHub"
label: "WG Contribution"
tag: "articles"
type: "contribution"

---

## EIP 4844: What does it mean for L2 users?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

## Contact

Twitter: [Arbitrum Hub](https://twitter.com/arbitrumDAO_hub)

Website: [Arbitrum Hub](https://arbitrumhub.io/)
