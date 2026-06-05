// Central content/data layer. Translatable copy lives in /messages/*.json;
// this file holds assets, links, and structured data keyed by stable ids.

export const S3 = 'https://hobby-tkang.s3.us-east-2.amazonaws.com';

export const PROFILE = {
  name: 'Taranjit Kang',
  shortName: 'Tarn',
  initials: 'TK',
  title: 'Senior Full Stack Software Developer',
  email: 'taranjitk18@gmail.com',
  photo: `${S3}/me.jpeg`,
  resumeUrl: `${S3}/Taranjit-Kang-FSD-2025.pdf`,
  coverLetterUrl: encodeURI(
    `${S3}/Taranjit-Kang-Full Stack Software Developer CL.pdf`,
  ),
};

export const SOCIALS = {
  github: 'https://github.com/tarnn',
  linkedin: 'https://www.linkedin.com/in/taranjit-kang-530737b8/',
  x: 'https://x.com/Tarn__K',
};

export type Skill = { name: string; logo: string };

// 19 technologies (logos hosted on S3). `logoDark` is used in dark mode where
// a separate light variant exists.
export const SKILLS: Skill[] = [
  { name: 'Java', logo: `${S3}/Java.svg` },
  { name: 'JavaScript', logo: `${S3}/Javascript.svg` },
  { name: 'TypeScript', logo: `${S3}/Typescript.svg` },
  { name: 'Python', logo: `${S3}/Python.svg` },
  { name: 'Spring Boot', logo: `${S3}/springboot.svg` },
  { name: 'React', logo: `${S3}/React.svg` },
  { name: 'Angular', logo: `${S3}/Angular.svg` },
  { name: 'Redux', logo: `${S3}/Redux.svg` },
  { name: 'AWS', logo: `${S3}/AWS.svg` },
  { name: 'Jenkins', logo: `${S3}/Jenkins.svg` },
  { name: 'Docker', logo: `${S3}/Docker.svg` },
  { name: 'Kubernetes', logo: `${S3}/Kubernetes.svg` },
  { name: 'Vagrant', logo: `${S3}/Vagrant.svg` },
  { name: 'GraphQL', logo: `${S3}/GraphQL.svg` },
  { name: 'Splunk', logo: `${S3}/Splunk.svg` },
  { name: 'Slack', logo: `${S3}/Slack.svg` },
  { name: 'Jira', logo: `${S3}/Jira.svg` },
  { name: 'GitHub', logo: `${S3}/Github.svg` },
  { name: 'WordPress', logo: `${S3}/Wordpress.svg` },
];

export type Experience = {
  id: 'adobe' | 'handshake' | 'intuit' | 'rbc' | 'ncr' | 'rogers';
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  logo: string;
  invertLogoOnDark?: boolean; // dark marks that need inverting in dark mode
  image?: string; // optional project screenshot; falls back to a branded card
  highlight: string; // short metric / signature achievement
  stack: string[]; // key technologies (tech badges)
  accent: string; // brand color hint
};

// Ordered most-recent first (drives the timeline).
export const EXPERIENCE: Experience[] = [
  {
    id: 'adobe',
    company: 'Adobe',
    role: 'Senior Backend Engineer',
    period: '2025 — Present',
    start: '2025',
    end: 'Present',
    location: 'San Jose, US',
    current: true,
    logo: '/logos/adobe.svg',
    highlight: 'Adobe Unified Platform · Catalog Engineering',
    stack: [
      'Java 21',
      'Spring Boot',
      'Ruby on Rails',
      'React / Next.js',
      'GraphQL',
      'AWS',
      'Kubernetes',
      'Postgres',
    ],
    accent: '#FA0F00',
  },
  {
    id: 'handshake',
    company: 'Handshake',
    role: 'Senior Software Developer',
    period: '2025',
    start: '2025',
    end: '2025',
    location: 'San Francisco, US',
    logo: '/logos/handshake.svg',
    highlight: '$20M ARR features · ~10% of company revenue',
    stack: [
      'Ruby on Rails',
      'React',
      'TypeScript',
      'Stripe',
      'Google Cloud',
      'BigQuery',
      'LaunchDarkly',
    ],
    accent: '#1A1A2E',
  },
  {
    id: 'intuit',
    company: 'Intuit',
    role: 'Senior Software Developer',
    period: '2021 — 2024',
    start: '2021',
    end: '2024',
    location: 'Toronto, CA',
    logo: `${S3}/intuit.svg`,
    image: `${S3}/Turbotax_homepage.png`,
    highlight: 'TurboTax homepage · millions of users',
    stack: [
      'Java',
      'Spring Boot',
      'React',
      'TypeScript',
      'Redux',
      'WordPress',
      'Splunk',
    ],
    accent: '#365EBF',
  },
  {
    id: 'rbc',
    company: 'Royal Bank of Canada',
    role: 'Senior Application Developer',
    period: '2020 — 2021',
    start: '2020',
    end: '2021',
    location: 'Toronto, CA',
    logo: `${S3}/rbc.svg`,
    image: `${S3}/RBC_Mobile_home.png`,
    highlight: 'RBC Mobile · Virtual Visa Debit',
    stack: ['Java', 'Spring Boot', 'Angular', 'Docker', 'Jenkins', 'PCF'],
    accent: '#0051A5',
  },
  {
    id: 'ncr',
    company: 'NCR',
    role: 'Senior Software Engineer',
    period: '2019 — 2020',
    start: '2019',
    end: '2020',
    location: 'Waterloo, CA',
    logo: `${S3}/ncr.svg`,
    image: `${S3}/tellerApp.jpg`,
    highlight: 'US Bank teller platform · global POS API',
    stack: [
      'Java',
      'Spring Boot',
      'Cucumber',
      'Docker',
      'Kubernetes',
      'Vagrant',
    ],
    accent: '#056938',
  },
  {
    id: 'rogers',
    company: 'Rogers — TSC',
    role: 'Client / Server Developer',
    period: '2018 — 2019',
    start: '2018',
    end: '2019',
    location: 'Mississauga, CA',
    logo: `${S3}/rogers-u.svg`,
    image: `${S3}/Rogers_TSC_home.png`,
    highlight: 'The Shopping Channel e-commerce',
    stack: ['TypeScript', 'Angular', 'C#', 'Elasticsearch', 'Python'],
    accent: '#C8102E',
  },
];

export type Testimonial = {
  name: string;
  occupation: string;
  avatar: string;
  linkedin: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Naga Satyaveni Kommireddy',
    occupation: 'Lead Software Developer',
    avatar: `${S3}/naga.jpeg`,
    linkedin:
      'https://www.linkedin.com/in/naga-satyaveni-kommireddy-777040134/',
    quote:
      'TJ was a great team member. We worked on multiple projects related to Spring Boot, Java, Angular, .NET, React, etc. TJ is a person with strong motivation who aims for excellence all the time. He is passionate about learning new technologies and is creative, energetic, solution-oriented, and highly motivated with great communication skills. He quickly adopts change and is always helpful to colleagues. He is an asset to any team and company.',
  },
  {
    name: 'Atilla Soylu',
    occupation: 'DevOps / Platform Integration Support Manager',
    avatar: `${S3}/atila.jpeg`,
    linkedin: 'https://www.linkedin.com/in/atillasoylu/',
    quote:
      'Taranjit has a great ability to observe and apply his knowledge to the challenges he faces. He has excelled in a very short time period to grasp great knowledge in development and technologies that are in the market.',
  },
  {
    name: 'Issa Ennab',
    occupation: 'Team Lead, Senior Java Developer',
    avatar: `${S3}/issab.jpeg`,
    linkedin: 'https://www.linkedin.com/in/issa-ennab-671882a9/',
    quote:
      'I worked with TJ at Express Scripts and he was a team lead and an expert in front-end technologies. TJ is eager to accomplish big and small tasks, always endeavours for excellence, and does whatever it takes to get the job done. His ability to work with different teams and projects, and provide great communication, is outstanding.',
  },
  {
    name: 'Florin Neagu',
    occupation: 'Independent Senior Software Consultant',
    avatar: `${S3}/florin.jpeg`,
    linkedin: 'https://www.linkedin.com/in/florinneagu/',
    quote:
      'It has been a pleasure working with Taranjit (or TJ, as everybody calls him). A complete developer, with a wide variety of skills and experience in both front end and back end, very reliable and focused on quality. An excellent communicator and a fun teammate. I strongly recommend him as a very valuable member of any software development team.',
  },
  {
    name: 'Hasan Mirza',
    occupation: 'Senior Software Engineer',
    avatar: `${S3}/hasan.jpeg`,
    linkedin: 'https://www.linkedin.com/in/mirzhasan/',
    quote:
      'It has been a delight to work with TJ. He is a versatile developer with extensive skills and experience. TJ is dependable, committed to quality, and an excellent communicator. He is also a great team player, making him a strong candidate for any software development team. I wholeheartedly recommend him.',
  },
  {
    name: 'Birinder Jagdev',
    occupation: 'Software Developer',
    avatar: `${S3}/birinder.jpeg`,
    linkedin: 'https://www.linkedin.com/in/birinder-jagdev-ab98077b/',
    quote:
      'I worked with TJ at NCR where he served as a team lead and demonstrated expertise in YAML + SpEL, Java, Spring Boot, Cucumber, Docker, Kubernetes, Vagrant, Jenkins, Bitbucket, GitLab, and Microsoft Teams. TJ is eager to tackle both big and small tasks, always striving for excellence. His ability to collaborate across teams and projects, coupled with exceptional communication skills, is truly outstanding.',
  },
];

export type FeaturedProject = {
  name: string;
  description: string;
  url: string;
  tags: string[];
};

// Live, deployed projects — featured above the GitHub repos.
export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'Nexus Studio',
    description:
      'Premium web development studio — high-performance web apps, mobile experiences, and AI integrations for ambitious brands.',
    url: 'https://nex-dev.app/',
    tags: ['Web', 'Mobile', 'AI'],
  },
  {
    name: 'Nexus — AI Agent Orchestration',
    description:
      'Real-time kanban board for managing and visualizing AI agent workflows.',
    url: 'https://agent-trello.vercel.app/',
    tags: ['React', 'Tailwind', 'Vite'],
  },
  {
    name: 'Presidential Chauffeurs',
    description:
      'Luxury chauffeur & limousine service — an elegant brand experience with fleet showcase and booking.',
    url: 'https://www.presidentialchauffeurs.com/',
    tags: ['Web', 'Booking', 'Brand'],
  },
];

export const NAV_LINKS = [
  { id: 'about', href: '#about' },
  { id: 'skills', href: '#skills' },
  { id: 'experience', href: '#experience' },
  { id: 'projects', href: '#projects' },
  { id: 'testimonials', href: '#testimonials' },
  { id: 'contact', href: '#contact' },
] as const;
