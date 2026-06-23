import type { Experience, SkillCategory, Education } from "@/lib/data";

export const profileEn = {
  headline: "Senior SEO, GEO and Content Strategy Consultant",
  summary:
    "SEO specialist with more than 10 years of experience dedicated to the discoverability, accessibility and longevity of digital content, in editorial, media and institutional environments. I implement organic-search strategies within newsrooms, integrating SEO concerns upstream of projects. An expert in SEO across its four dimensions (technical, editorial, data, performance) and in visibility within AI engines (GEO), I place particular importance on pedagogy and on building a durable SEO culture.",
};

export const experiencesEn: Experience[] = [
  {
    company: "Proximus",
    role: "Senior SEO and GEO Consultant",
    tag: "Freelance",
    period: "Nov. 2025 — present",
    location: "Brussels, Hybrid",
    highlight: "Belgium’s leading telecom operator",
    points: [
      "Deployment of the SEO and GEO strategy for client content in French, Dutch and English, in coordination with content designers, newsrooms, agencies and product stakeholders.",
      "Semantic structuring and pillar/cluster architecture of a 220,000+ page ecosystem, consolidation of FAQ, blog and forum to reduce cannibalisation.",
      "Definition of the architecture and quality monitoring of metadata, steering of technical SEO audits and release quality.",
      "Development of a GEO framework (10 tactics) to improve visibility in AI engines (AI Overviews, ChatGPT, Perplexity, Copilot) and of a tailored internal tool.",
      "Multi-platform performance monitoring (Adobe Analytics, Contentsquare, Search Console, Semrush) translated into executive reports and actionable recommendations.",
    ],
  },
  {
    company: "Groupe Audit Belgium",
    role: "Digital Acquisition and CRO Consultant",
    tag: "Freelance",
    period: "Nov. 2025 — present",
    location: "Brussels, Remote",
    points: [
      "Complete rebuild of the corporate site in multilingual architecture (FR, NL, EN), structuring user journeys to maximise lead capture.",
      "End-to-end SEO strategy: architecture, semantic content, internal linking, Core Web Vitals, indexing, sitemap, Search Console.",
      "Creation, launch and continuous optimisation of Google Ads (Search) campaigns to improve cost per lead.",
    ],
  },
  {
    company: "European Parliament",
    role: "Senior SEO Strategy Consultant",
    tag: "Freelance",
    period: "Nov. 2023 — Oct. 2025",
    location: "Remote",
    highlight: "European institution",
    points: [
      "Steering, over several quarters, of the search optimisation strategy (relevance, response speed, reduction of zero results) through a data-driven and iterative approach.",
      "Cross-functional collaboration with UX and UI teams to improve the search experience (query refinement, filters, result layout).",
      "Transformation of search logs and behavioural data (Piano Analytics) into dashboards and strategic recommendations.",
    ],
  },
  {
    company: "Forbes BeLux",
    role: "Web Launch and Content Strategy Lead",
    tag: "Freelance",
    period: "Oct. 2023 — Oct. 2024",
    location: "Brussels, Remote",
    highlight: "Business and finance media",
    points: [
      "Steering of the Forbes BeLux site editorial launch: content strategy, editorial pillars, calendars and publishing workflows within the newsroom.",
      "Definition and execution of a multilingual editorial SEO strategy (FR, NL, EN): on-page optimisation, semantic SEO, thematic clusters and internal linking.",
      "Development of SEO playbooks and training of journalists in search intent, E-E-A-T principles and news SEO best practices.",
    ],
  },
  {
    company: "Equine Care Group",
    role: "CRO and Growth Strategy Consultant",
    tag: "Freelance",
    period: "May 2024 — Apr. 2025",
    location: "Remote",
    highlight: "Multi-brand e-commerce",
    points: [
      "CRO and growth strategy on a multi-brand e-commerce ecosystem through a test-and-learn approach, A/B testing and funnel optimisation.",
      "Management and optimisation of Google Ads and Meta Ads campaigns to maximise ROAS and sales growth.",
      "Global SEO and GEO strategy connecting acquisition and on-site performance (engagement, conversion, retention).",
    ],
  },
  {
    company: "Carbonable",
    role: "Digital Marketing Coordinator",
    tag: "Freelance",
    period: "Sept. 2021 — Aug. 2023",
    location: "Remote",
    points: [
      "Community growth strategies (Discord, X, Telegram), production of editorial content, performance monitoring via Looker Studio dashboards.",
      "Management of influencer and brand partnerships to accelerate awareness and community expansion.",
    ],
  },
  {
    company: "LUDO LUDO",
    role: "Co-founder",
    tag: "Non-profit",
    period: "Mar. 2021 — Feb. 2024",
    location: "Brussels",
    points: [
      "E-commerce, content strategy, SEO and paid acquisition for a Brussels cultural association.",
    ],
  },
  {
    company: "ESTACA",
    role: "Digital Communication Lead",
    tag: "Apprenticeship",
    period: "Apr. 2018 — Mar. 2021",
    location: "Paris, France",
    points: [
      "Google Ads acquisition campaigns, UX rebuild of the admissions site, on-site SEO improvements and email campaign optimisation.",
    ],
  },
  {
    company: "VisiYou",
    role: "Web Developer and UI Designer",
    tag: "Apprenticeship",
    period: "Nov. 2015 — Oct. 2017",
    location: "Brussels",
    points: [
      "Building WordPress and WooCommerce sites end to end, training clients in web analytics fundamentals.",
    ],
  },
];

export const skillCategoriesEn: SkillCategory[] = [
  {
    name: "Editorial SEO and content",
    items: [
      "Editorial SEO strategy",
      "Writing guidelines",
      "Pillar/cluster architecture",
      "Semantic SEO",
      "Search intent and E-E-A-T",
      "News SEO",
      "Multilingual content (FR, NL, EN)",
    ],
  },
  {
    name: "Technical SEO and data",
    items: [
      "Technical audits",
      "Schema markup",
      "Internal linking",
      "Core Web Vitals",
      "Migrations and indexing",
      "Metadata architecture",
    ],
  },
  {
    name: "AI engines (GEO)",
    items: [
      "Generative Engine Optimization",
      "LLM visibility (AI Overviews, ChatGPT, Perplexity, Copilot)",
      "Writing for AI engines",
      "Continuous SEO and AI monitoring",
    ],
  },
  {
    name: "Tools",
    items: [
      "Google Search Console",
      "Google Analytics 4",
      "Adobe Analytics",
      "Contentsquare",
      "Semrush",
      "Ahrefs",
      "Screaming Frog",
      "Looker Studio",
      "Google Ads",
      "Meta Ads",
    ],
  },
];

export const languagesEn = [
  { name: "French", level: "C2 · native" },
  { name: "English", level: "C1 · professional" },
  { name: "Dutch", level: "B1 · intermediate" },
];

export const educationEn: Education[] = [
  {
    diploma: "Master of Science in Digital Marketing and Business",
    school: "OMNES Education, Paris",
    period: "2018 — 2021",
  },
  {
    diploma: "Professional Training in DeFi and Blockchain",
    school: "Alyra",
    period: "2021",
  },
  {
    diploma: "Certificate in Design and Business Management",
    school: "EFP, Brussels",
    period: "2015 — 2017",
  },
];

export const sideProjectsEn = [
  {
    name: "RDIGITAL",
    desc: "Independent consulting practice in SEO, GEO and content strategy.",
  },
  {
    name: "LUDO LUDO",
    desc: "Brussels-based cultural association, co-founded.",
  },
  {
    name: "Harmony",
    desc: "Photography and arts association for youth (France, Peru, Thailand).",
  },
];
