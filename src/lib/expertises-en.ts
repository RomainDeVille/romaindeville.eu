import type { Expertise } from "@/lib/expertises";

/** Expertise traduite en anglais : même structure, slug EN, plus le slug FR pour le hreflang. */
export interface ExpertiseEn extends Expertise {
  frSlug: string;
}

export const EXPERTISES_EN: ExpertiseEn[] = [
  {
    slug: "seo-consultant-brussels",
    frSlug: "consultant-seo-bruxelles",
    name: "SEO Consultant Brussels",
    cardText:
      "Technical audits, pillar/cluster architecture, metadata, Core Web Vitals, news SEO. From code to copy, on ecosystems of up to 220,000 pages.",
    title: "SEO Consultant in Brussels: technical and editorial B2B SEO",
    description:
      "Senior SEO consultant in Brussels: technical audits, pillar/cluster architecture, Core Web Vitals, news SEO and multilingual FR/NL/EN strategies for companies, media and institutions.",
    eyebrow: "SEO Consultant · Brussels · FR, NL, EN",
    h1Pre: "SEO consultant in Brussels for ",
    h1Mark: "brands, media and institutions",
    intro:
      "Ten years of search across its four dimensions: technical, editorial, data and performance. From 220,000-page ecosystems to media launches, in French, Dutch and English.",
    scopeTitle: "Audits, architecture, data: SEO across its four dimensions",
    scopeCards: [
      {
        title: "Technical SEO",
        text: "Full audits, Core Web Vitals, indexing, migrations, metadata architecture, schema markup, release quality. The foundation without which content cannot carry.",
      },
      {
        title: "Editorial SEO",
        text: "Pillar/cluster architecture, semantic SEO, search intent, E-E-A-T, news SEO. I have trained entire newsrooms, from Forbes BeLux to telecom content teams.",
      },
      {
        title: "Multilingual SEO",
        text: "Coordinated FR, NL and EN strategies: architecture per language, cannibalisation between versions, coordination of newsrooms and agencies. A Belgian reality few master.",
      },
      {
        title: "Data and reporting",
        text: "Search Console, GA4, Adobe Analytics, Contentsquare, Semrush. Dashboards and executive reports that turn data into decisions, not decorative slides.",
      },
    ],
    proofTitle: "220,000 structured pages, three contexts, one method",
    proofText:
      "Semantic structuring of an ecosystem of over 220,000 pages at Proximus, optimisation of the search experience at the European Parliament, editorial and SEO launch of Forbes BeLux. Three different scales, the same standard.",
    proofLinks: [
      { label: "Proximus case study", href: "/en/case-studies/proximus" },
      { label: "All case studies", href: "/en/case-studies" },
    ],
    faqTitle: "Frequently asked questions about SEO in Brussels",
    faq: [
      {
        q: "Do you work on site in Brussels or remotely?",
        a: "Both. I am based in Brussels and travel to Belgian clients when the engagement calls for it: workshops, training, editorial committees. The rest is done remotely, with regular check-ins. For clients outside Belgium, I work entirely remotely.",
      },
      {
        q: "What is the difference between a freelance SEO consultant and an agency?",
        a: "You talk to the person who executes. No intermediary project manager, no junior learning on your budget. I work across all four dimensions of SEO (technical, editorial, data, performance) and I train your teams so the skill stays with you after the engagement.",
      },
      {
        q: "Do you work in Dutch and English?",
        a: "Yes. I have led multilingual FR, NL and EN SEO strategies for Proximus and Forbes BeLux: content architecture per language, coordination of newsrooms, management of cannibalisation between language versions.",
      },
      {
        q: "What types of sites have you worked on?",
        a: "Ecosystems of more than 220,000 pages (telecom), institutional sites (European Parliament), media (Forbes BeLux), multi-brand e-commerce and B2B corporate sites. The method adapts, the standard stays the same.",
      },
      {
        q: "How long before SEO results appear?",
        a: "It depends on your starting authority, the competition on your queries and the pace of implementation. First movements are usually measured in two to three months, consolidation in six to twelve. I measure before and after, and I never promise a ranking.",
      },
      {
        q: "What are your rates?",
        a: "By scope, after a free 20-minute scoping call with no commitment. No hidden costs, no imposed contract length: the quote describes what is done, when, and what you receive.",
      },
    ],
    related: ["geo-consultant-belgium", "seo-audit", "b2b-content-strategy"],
    serviceType: "Search Engine Optimization",
  },
  {
    slug: "geo-consultant-belgium",
    frSlug: "consultant-geo-belgique",
    name: "GEO Consultant Belgium",
    cardText:
      "Make your brand a source that ChatGPT, Perplexity, Gemini and AI Overviews cite. A 10-tactic framework, a dedicated audit and a roadmap.",
    title: "GEO Consultant Belgium: visibility in AI answers",
    description:
      "GEO consultant in Belgium: make your brand a source that ChatGPT, Perplexity, Gemini and Google AI Overviews cite. AI-visibility audit and prioritised action plan. Brussels, FR/NL/EN.",
    eyebrow: "GEO Consultant · Belgium · Brussels",
    h1Pre: "GEO consultant in Belgium: when your customers ask an AI, who shows up — ",
    h1Mark: "you, or your competitors",
    h1Post: " ?",
    intro:
      "I help brands become sources that ChatGPT, Perplexity and Gemini cite. Because search is shifting, and what doesn’t show up in Google Analytics now plays out elsewhere.",
    scopeTitle: "AI-visibility audit, benchmark, roadmap: the GEO offer",
    scopeCards: [
      {
        title: "Real visibility",
        text: "I test your brand on ChatGPT, Perplexity, Gemini and Google AI, on your customers’ actual questions. What the AIs say about you today, measured, not assumed.",
      },
      {
        title: "Competitor benchmark",
        text: "Who is cited in your place, on which queries, and why. The gap can be measured, and it can be closed.",
      },
      {
        title: "Prioritised roadmap",
        text: "Structured data, llms.txt, content as direct answers, authority signals: each action ranked by impact, directly usable by your team.",
      },
      {
        title: "Proven framework",
        text: "A 10-tactic GEO framework and tooling developed and deployed in-house, on an ecosystem of more than 220,000 pages in three languages.",
      },
    ],
    proofTitle: "Deployed at Proximus, not a conference concept",
    proofText:
      "The GEO framework and the internal tool I use were developed on assignment at Belgium’s leading telecom operator, on a trilingual ecosystem of over 220,000 pages. There, GEO is a managed initiative with indicators, not an experiment.",
    proofLinks: [{ label: "Proximus case study", href: "/en/case-studies/proximus" }],
    faqTitle: "Frequently asked questions about GEO",
    faq: [
      {
        q: "What is a GEO consultant?",
        a: "GEO (Generative Engine Optimization) is about making a brand visible in answers generated by AIs: ChatGPT, Perplexity, Gemini, Google AI Overviews. A GEO consultant audits what these engines say about you, identifies why your competitors are cited in your place, and puts in place the content, structured data and authority signals that make your site a cited source.",
      },
      {
        q: "What is the difference between SEO and GEO?",
        a: "SEO targets the ranking of your pages in search results. GEO targets the citation of your brand in AI answers. The two reinforce each other: a solid technical SEO foundation is a prerequisite for GEO, but GEO adds specific levers such as Schema.org structured data, the llms.txt file, AI crawler access and content written as direct answers.",
      },
      {
        q: "Does GEO replace SEO?",
        a: "No, it adds to it. Google remains the first source of traffic for most sites. But a growing share of decisions forms in AI answers, before any click. Working on one without the other means leaving a channel to your competitors.",
      },
      {
        q: "How does a GEO audit work?",
        a: "Three steps: I test your real visibility on ChatGPT, Perplexity, Gemini and Google AI on your customers’ actual questions, I compare with your competitors to identify who is cited and why, then I deliver a roadmap ranked by impact, directly usable by your team.",
      },
      {
        q: "Do you work throughout Belgium?",
        a: "Yes. I am based in Brussels and work across Belgium, on site or remotely, in French, Dutch and English. I also support clients in France and elsewhere in Europe remotely.",
      },
      {
        q: "What results can be expected, and how soon?",
        a: "First signals (citations in AI answers, referral traffic from generative engines) usually appear within a few weeks to a few months depending on your starting authority. GEO is a recent discipline: brands that position themselves now gain a measurable lead. I never promise a figure in advance; I measure before and after.",
      },
    ],
    related: ["seo-consultant-brussels", "b2b-content-strategy", "seo-audit"],
    serviceType: "Generative Engine Optimization",
    showAiMock: true,
  },
  {
    slug: "b2b-content-strategy",
    frSlug: "strategie-contenu-b2b",
    name: "B2B Content Strategy",
    cardText:
      "Editorial launches, content pillars, writing workflows, SEO playbooks and team training. A culture that stays.",
    title: "B2B Content Strategy in Belgium: feeding Google and the AIs",
    description:
      "Multilingual B2B content strategy in Belgium: editorial pillars, writing workflows, SEO playbooks and team training. Content that ranks in Google and gets cited by the AIs.",
    eyebrow: "Content Strategy · B2B · FR, NL, EN",
    h1Pre: "Content that ranks in Google ",
    h1Mark: "and gets cited by the AIs",
    intro:
      "A single piece of content now feeds two channels: classic search results and answers generated by ChatGPT, Perplexity or Google AI Overviews. I design editorial strategies that serve both, and I train your teams to keep them alive.",
    scopeTitle: "Pillars, workflows, training: the complete editorial machine",
    scopeCards: [
      {
        title: "Pillars and clusters",
        text: "Editorial pillars aligned with your business, pillar/cluster architecture, internal linking. Every piece has a place, a target and a role. No more blogs publishing into the void.",
      },
      {
        title: "Writing workflows",
        text: "Calendars, briefs, validation circuits, SEO integrated upstream of writing rather than as a fix afterwards. Deployed in real newsrooms, including the full editorial launch of Forbes BeLux.",
      },
      {
        title: "Writing for AI engines",
        text: "Direct answers, question structure, verifiable data, E-E-A-T: the content generative engines cite has measurable characteristics. I build them into your guidelines.",
      },
      {
        title: "Training and playbooks",
        text: "Tailored SEO playbooks, training journalists and marketing teams on search intent and best practices. The goal: quality no longer depends on my presence.",
      },
    ],
    proofTitle: "A media launched from scratch, autonomous newsrooms",
    proofText:
      "Full editorial launch of Forbes BeLux: pillars, calendars, workflows and journalist training, in three languages. The playbooks outlived the engagement — that is the criterion that counts.",
    proofLinks: [
      { label: "Forbes BeLux case study", href: "/en/case-studies/forbes-belux" },
      { label: "All case studies", href: "/en/case-studies" },
    ],
    faqTitle: "Frequently asked questions about B2B content strategy",
    faq: [
      {
        q: "Where does a B2B content strategy start?",
        a: "With your customers, not with an editorial calendar. We identify the questions they ask at each stage of their decision, group them into pillars, then build the content architecture that answers them. The calendar comes last: it is an execution tool, not a strategy.",
      },
      {
        q: "Is writing for AIs different from writing for Google?",
        a: "The fundamentals overlap: answer an intent clearly, structure, source. But generative engines have measurable preferences: direct answers at the start of sections, question-answer formats, verifiable data, explicit authority signals. I integrate these criteria into the writing guidelines.",
      },
      {
        q: "Do you train our teams or produce the content?",
        a: "Both as needed, with a stated preference for training: tailored playbooks, workshops with writers, supported reviews. The goal is for quality to no longer depend on my presence. It is the method deployed at Forbes BeLux and in a telecom environment.",
      },
      {
        q: "Do you handle multilingual FR, NL, EN content?",
        a: "Yes, it is a core competency: architecture per language, keyword research per market, coordination of newsrooms and management of cannibalisation between language versions.",
      },
      {
        q: "Do you use AI to write?",
        a: "As an assistant, yes: research, structuring, first drafts framed by strict guidelines. As an autonomous producer, no: generic content generated at scale carries neither the expertise nor the experience that Google and the AIs reward. The human signature remains the differentiator.",
      },
      {
        q: "How many pieces should you publish per month?",
        a: "Fewer than you think, better than you do now. One solid pillar piece per month, properly linked and updated, beats ten thin articles. The pace is set by your real resources: an unsustainable calendar is a calendar dead in three months.",
      },
    ],
    related: ["seo-consultant-brussels", "geo-consultant-belgium", "seo-training-belgium"],
    serviceType: "Content Strategy",
  },
  {
    slug: "web-design-belgium",
    frSlug: "creation-site-web-belgique",
    name: "Web Design & Development",
    cardText:
      "Fast, lean, SEO-ready sites from day one. The simplest proof: the one you’re reading.",
    title: "Web Design in Belgium: fast, lean and SEO-ready",
    description:
      "Web design and development in Belgium: design, modern build and SEO integrated from day one. Core Web Vitals in the green, security and sobriety measurable publicly.",
    eyebrow: "Web Design · Belgium",
    h1Pre: "A website that is ",
    h1Mark: "fast, lean and visible from day one",
    intro:
      "A site scoring 99/100 in performance and A+ in carbon sobriety is not a sales promise: it is this very site, verifiable with any public tool. I build showcase and B2B sites with SEO integrated into the design, not patched on afterwards.",
    scopeTitle: "Design, development, SEO: a single point of contact",
    scopeCards: [
      {
        title: "Architecture and content",
        text: "Site structure built from your customers’ queries, internal linking, multilingual FR/NL/EN if your market requires it. Site structure is an SEO decision, not a graphic one.",
      },
      {
        title: "Modern development",
        text: "Recent stack, Core Web Vitals in the green as a delivery criterion, security headers, accessibility. No heavy page builder that drags down speed at the first plugin.",
      },
      {
        title: "SEO and GEO built in",
        text: "Metadata, Schema.org structured data, llms.txt, sitemap and Search Console configured at launch. The site is born visible instead of catching up.",
      },
      {
        title: "Autonomy",
        text: "Training for updates, documentation, code and access that belong to you. No captive subscription, no dependence on the provider.",
      },
    ],
    proofTitle: "The proof is this site",
    proofText:
      "The site you are reading is my technical showcase: Lighthouse performance 99-100 on desktop, security grade A, carbon footprint A+, complete structured data and a clean hierarchy. Audit it with any tool: that is the standard I deliver.",
    proofLinks: [{ label: "SEO and AI-visibility audit", href: "/en/seo-audit" }],
    faqTitle: "Frequently asked questions about web design",
    faq: [
      {
        q: "How long for a showcase site?",
        a: "A few weeks, not a few months, for a standard showcase or B2B site: the exact timeline depends on the number of pages, languages and the availability of your content. The schedule is set in the quote and kept.",
      },
      {
        q: "WordPress or custom?",
        a: "Both are possible. I favour a modern, lightweight foundation when the project allows it, because speed and security are structural there. If you already have a WordPress, I can optimise it rather than rebuild everything: the right answer depends on the existing setup, not on dogma.",
      },
      {
        q: "Will the site really be fast?",
        a: "Core Web Vitals in the green are a delivery criterion, measured with Google’s public tools before launch. If a page does not pass, it is not delivered. My own site serves as a public benchmark of this standard.",
      },
      {
        q: "Do you build multilingual FR, NL, EN sites?",
        a: "Yes, it is a specialty: architecture per language, localised metadata, management of cannibalisation between versions. In Belgium, a serious site is often multilingual by design.",
      },
      {
        q: "Is SEO included?",
        a: "The technical SEO foundation is included: metadata, structured data, sitemap, Search Console, performance. Content strategy and link acquisition are engagements in their own right: I tell you clearly where one ends and the other begins.",
      },
      {
        q: "How much does a website cost?",
        a: "By scope: number of pages, languages, features, content to produce or not. Precise quote after a free 20-minute call. No hidden costs or imposed subscription: the site is yours.",
      },
    ],
    related: ["web-performance", "seo-consultant-brussels", "monthly-seo-monitoring"],
    serviceType: "Web Design and Development",
  },
  {
    slug: "google-ads-consultant-belgium",
    frSlug: "consultant-google-ads-belgique",
    name: "Google Ads & CRO",
    cardText:
      "Search campaigns managed on cost per lead, A/B testing and funnel optimisation. Traffic isn’t the goal: conversion is.",
    title: "Google Ads Consultant in Belgium: campaigns managed on cost per lead",
    description:
      "Google Ads consultant in Belgium: creation, launch and optimisation of Search and Meta Ads campaigns, paired with CRO. Managed on cost per lead and ROAS, not on clicks.",
    eyebrow: "Paid acquisition · CRO · Belgium",
    h1Pre: "Google Ads campaigns judged on ",
    h1Mark: "cost per lead, not on clicks",
    intro:
      "Creation, launch and continuous optimisation of Search and Meta Ads campaigns, paired with conversion work on the site: A/B testing, funnel, landing pages. Because a paid click that doesn’t convert is an expense, not a result.",
    scopeTitle: "Campaigns, conversion, measurement: acquisition end to end",
    scopeCards: [
      {
        title: "Search campaigns",
        text: "Clean account structure, mastered keywords and match types, tested ads, managed budgets. Continuous optimisation on cost per lead, not on click volume.",
      },
      {
        title: "CRO and funnel",
        text: "A/B testing, optimisation of landing pages and the conversion journey. Raising the conversion rate makes every advertising euro more profitable, durably.",
      },
      {
        title: "Tracking and measurement",
        text: "Conversions configured properly, GA4, readable dashboards. Without reliable measurement, optimisation is guesswork: clean tracking is a prerequisite, not an option.",
      },
      {
        title: "SEO and SEA synergy",
        text: "Don’t pay for queries you already win organically; cover with Ads what SEO does not yet reach. The two channels are managed together.",
      },
    ],
    proofTitle: "E-commerce ROAS and B2B cost per lead",
    proofText:
      "Management of Google Ads and Meta Ads campaigns for a multi-brand e-commerce ecosystem (Equine Care Group), B2B lead generation for Groupe Audit Belgium, acquisition campaigns for higher education (ESTACA). Three different conversion logics, the same measurement discipline.",
    proofLinks: [
      { label: "Equine Care Group case study", href: "/en/case-studies/equine-care-group" },
      { label: "Groupe Audit Belgium case study", href: "/en/case-studies/groupe-audit-belgium" },
    ],
    faqTitle: "Frequently asked questions about Google Ads",
    faq: [
      {
        q: "What is the minimum budget for Google Ads?",
        a: "It depends on the cost per click of your sector in Belgium. Below a certain volume of data, the algorithm cannot learn and optimisation becomes impossible: if your budget cannot reach that threshold, I tell you before we start, and we look at whether SEO isn’t a better first lever.",
      },
      {
        q: "Do you also manage Meta Ads?",
        a: "Yes, Meta Ads (Facebook and Instagram) alongside Search, notably for e-commerce and awareness. The channel is chosen according to your buying cycle, not the trend.",
      },
      {
        q: "Is there a minimum commitment period?",
        a: "No. Management is monthly and cancellable. Campaigns need a few weeks of learning to show their measure, which I state at scoping, but nothing locks you in contractually.",
      },
      {
        q: "What is the difference with a media agency?",
        a: "You talk to the person with their hands on the account. No opaque management fees as a percentage of budget, no campaigns left on autopilot. And the account belongs to you: you keep the history if the collaboration ends.",
      },
      {
        q: "How do you measure results?",
        a: "Conversions configured properly before the first euro is spent: leads, calls, sales depending on your activity. Readable monthly reporting: spend, cost per lead or ROAS, and decisions taken. If a campaign underperforms, you see it too.",
      },
      {
        q: "Do you work throughout Belgium?",
        a: "Yes, campaign management is done remotely, with regular check-ins by video or on site in and around Brussels when useful.",
      },
    ],
    related: ["google-ads-pricing-belgium", "google-ads-brussels", "google-ads-by-industry-belgium"],
    serviceType: "Pay Per Click Advertising",
  },
  {
    slug: "seo-audit",
    frSlug: "audit-seo",
    name: "SEO & AI-Visibility Audit",
    cardText:
      "A complete diagnosis: performance, security, authority, keywords and presence in AI answers. Delivered with a prioritised roadmap.",
    title: "SEO Audit in Belgium: complete diagnosis and AI visibility",
    description:
      "Complete SEO audit in Belgium: mobile and desktop performance, field data, security, authority, keywords and GEO signals. Every finding quantified, every action prioritised by impact and effort.",
    eyebrow: "SEO Audit · AI Visibility · Belgium",
    h1Pre: "An audit that tells you ",
    h1Mark: "what to fix, in what order, and why",
    intro:
      "Nine areas analysed: mobile and desktop performance, real field data, security, email deliverability, code validity, domain authority, keyword opportunities, carbon footprint and GEO signals. Every finding is quantified, every action prioritised by impact and effort.",
    scopeTitle: "Nine areas, one diagnosis, one roadmap",
    scopeCards: [
      {
        title: "Technical and performance",
        text: "Lab Core Web Vitals (mobile and desktop) and on your real users via Chrome UX Report, blocking resources identified file by file, W3C validity, HTTP header security.",
      },
      {
        title: "AI visibility (GEO)",
        text: "Schema.org structured data, llms.txt file, AI crawler access (GPTBot, ClaudeBot, PerplexityBot...), essential tags. What generative engines can read about you, and what they’re missing.",
      },
      {
        title: "Authority and competition",
        text: "Your domain’s authority profile compared to direct competitors, keyword opportunities from real Google suggestions, sorted by intent.",
      },
      {
        title: "Roadmap",
        text: "Cross-cutting priorities across all areas, ranked by impact and effort, a 30/60/90-day roadmap. With your business data, the stakes are quantified in euros, cautiously.",
      },
    ],
    proofTitle: "Built in-house, proven on assignment",
    proofText:
      "The audit relies on tooling I developed and use on assignment: nine analyses run in parallel on official Google data (Lighthouse, Chrome UX Report, Safe Browsing), a report written area by area then synthesised. The same standard as the audits conducted at Proximus.",
    proofLinks: [{ label: "Proximus case study", href: "/en/case-studies/proximus" }],
    faqTitle: "Frequently asked questions about the SEO audit",
    faq: [
      {
        q: "What does the report actually contain?",
        a: "An executive summary, a chapter per analysed area with the measured data, quantified findings and recommendations, cross-cutting priorities ranked by impact and effort, and a conclusion with the 90-day trajectory. PDF format, in English, without unnecessary jargon.",
      },
      {
        q: "How long does an audit take?",
        a: "Collection and tooled analysis are quick; the value is in the expert reading, the prioritisation and the recommendations specific to your context. Allow a few days between scoping and delivery, depending on scope.",
      },
      {
        q: "Do I need to give you access?",
        a: "No for the external audit: everything is analysed from the outside, as Google and the AIs see your site. Search Console and Analytics access are optional and allow going further on real keywords and visitor behaviour.",
      },
      {
        q: "What is the difference with a free online audit?",
        a: "Free tools output scores; a serious audit says why, in what order to fix, and what it changes for your business. Raw data is the raw material, contextual prioritisation is the deliverable.",
      },
      {
        q: "And after the audit?",
        a: "Three options: your team executes the roadmap autonomously, I support you on priority work, or we move to monthly monitoring to steer progress. The audit is designed to be actionable in all three cases.",
      },
      {
        q: "How much does an audit cost?",
        a: "By scope: site size, languages, competitive depth. Quote after a free 20-minute scoping call with no commitment.",
      },
    ],
    related: ["monthly-seo-monitoring", "seo-consultant-brussels", "web-performance"],
    serviceType: "SEO Audit",
  },
  {
    slug: "web-performance",
    frSlug: "performance-web",
    name: "Web Performance",
    cardText:
      "Core Web Vitals in the green, faster pages, polished mobile experience. Speed is a ranking criterion and a conversion lever.",
    title: "Web Performance and Core Web Vitals: fast pages that convert",
    description:
      "Web performance optimisation in Belgium: Core Web Vitals (LCP, INP, CLS) measured in the lab and on your real users, targeted fixes without a rebuild. Speed is a ranking and conversion lever.",
    eyebrow: "Web Performance · Core Web Vitals",
    h1Pre: "Every second of load time ",
    h1Mark: "costs conversions",
    intro:
      "Diagnosis and correction of Core Web Vitals: LCP, INP and CLS, measured in the lab and on your real users via Chrome UX Report. Performance is not a developer topic: it is a Google ranking criterion and a direct conversion lever.",
    scopeTitle: "Measure, fix, maintain: performance in three steps",
    scopeCards: [
      {
        title: "Lab and field diagnosis",
        text: "Lighthouse mobile and desktop, real Chrome UX Report data over 28 days, blocking resources identified file by file. We fix what is measured, not what is assumed.",
      },
      {
        title: "Targeted fixes",
        text: "Images, fonts, blocking scripts, cache, layout shifts: most sites gain their seconds without a rebuild. Each fix is verified by a new measurement.",
      },
      {
        title: "Tracking over time",
        text: "Core Web Vitals degrade with every unmonitored change to the site. Setting up field monitoring to catch regressions before they cost.",
      },
      {
        title: "Performance and sobriety",
        text: "A fast site is a light site: less weight transferred means a reduced carbon footprint and a measurable CSR argument. The two goals serve each other.",
      },
    ],
    proofTitle: "This site as a public benchmark",
    proofText:
      "The site you are reading shows Core Web Vitals in the green and Lighthouse performance of 99-100 on desktop, verifiable with Google’s public tools. That is the standard I apply to the sites I optimise, from B2B showcases to ecosystems of several hundred thousand pages.",
    proofLinks: [{ label: "SEO and AI-visibility audit", href: "/en/seo-audit" }],
    faqTitle: "Frequently asked questions about web performance",
    faq: [
      {
        q: "What are Core Web Vitals?",
        a: "Three experience metrics defined by Google: LCP (how fast the main content displays), INP (responsiveness to interactions) and CLS (visual stability of the page). Google measures them on your real Chrome visitors and factors them into ranking.",
      },
      {
        q: "Why is my site slower on mobile?",
        a: "The mobile test simulates a mid-range device on a degraded network: throttled processor, slow connection. That is the reality for some of your visitors. A site comfortable on your desktop can be painful on a prospect’s smartphone on the train.",
      },
      {
        q: "Does speed really influence SEO?",
        a: "Yes, but let’s be precise: it is one ranking criterion among hundreds, rarely the one that moves you from page 3 to page 1. Its strongest effect is indirect: fewer bounces, more pages viewed, more conversions. It is above all a business lever.",
      },
      {
        q: "Do I need to rebuild my site to make it fast?",
        a: "Rarely. Most gains come from targeted fixes: poorly sized images, blocking fonts, useless scripts, missing cache. A rebuild is only justified if the technical foundation is structurally doomed, and I tell you if that is the case.",
      },
      {
        q: "Do you work on WordPress?",
        a: "Yes. WordPress is not slow by nature, it becomes slow through accumulation: heavy themes, redundant plugins, unoptimised media. Optimisation follows the same method as everywhere: measure, fix, re-measure.",
      },
      {
        q: "How will I know it worked?",
        a: "By before/after measurement, in the lab and on your real users. Chrome UX Report field data takes 28 days to fully reflect the fixes: the final report compares the two states, figures in hand.",
      },
    ],
    related: ["web-design-belgium", "seo-audit", "monthly-seo-monitoring"],
    serviceType: "Web Performance Optimization",
  },
  {
    slug: "seo-training-belgium",
    frSlug: "formation-seo-belgique",
    name: "SEO & GEO Training",
    cardText:
      "Tailored training for newsrooms and marketing teams: search intent, E-E-A-T, news SEO and AI visibility. The skill stays with you.",
    title: "SEO and GEO Training in Belgium: for newsrooms and marketing teams",
    description:
      "SEO and GEO training in Belgium: search intent, E-E-A-T, news SEO and writing for AI engines. Tailored workshops, playbooks and support, in French, Dutch or English.",
    eyebrow: "Training · SEO and GEO · Belgium",
    h1Pre: "Train your teams so visibility ",
    h1Mark: "no longer depends on a provider",
    intro:
      "I have trained journalists at Forbes BeLux and content teams in a telecom environment: search intent, E-E-A-T, news SEO, writing for AI engines. Tailored formats, anchored in your real content rather than theoretical slides.",
    scopeTitle: "Workshops, playbooks, support: training that produces",
    scopeCards: [
      {
        title: "Editorial SEO fundamentals",
        text: "Search intent, content structure, metadata, linking: what every writer must master for their content to carry. On your own pages, not on generic examples.",
      },
      {
        title: "Writing for AI engines",
        text: "What makes content cited by ChatGPT, Perplexity or AI Overviews: direct answers, verifiable data, structure. The GEO module few trainings cover.",
      },
      {
        title: "Tailored playbooks",
        text: "Guidelines written for your context: your tone, your formats, your validation circuits. The deliverable that stays when the training is over and the questions return.",
      },
      {
        title: "Support for first productions",
        text: "Annotated reviews of the first content produced after the training: that is where the reflexes settle in. Training without follow-up fades in six weeks.",
      },
    ],
    proofTitle: "Newsrooms that produce without me",
    proofText:
      "At Forbes BeLux, I trained journalists in search intent, E-E-A-T and news SEO during the media launch: the playbooks outlived the engagement and still structure production. That is the only criterion of a successful training.",
    proofLinks: [{ label: "Forbes BeLux case study", href: "/en/case-studies/forbes-belux" }],
    faqTitle: "Frequently asked questions about SEO and GEO training",
    faq: [
      {
        q: "Who are these trainings for?",
        a: "For the teams who produce: newsrooms, content managers, marketing teams, communication officers. The level adapts, from complete beginner to seasoned team wanting to integrate the AI module. No technical prerequisite.",
      },
      {
        q: "In person or remote?",
        a: "Both. In person in Brussels and across Belgium for team workshops, remote for short formats and follow-ups. In person remains more effective for practical workshops on your content.",
      },
      {
        q: "Do you train in Dutch and English?",
        a: "Yes: native French, professional English, operational Dutch. Materials and playbooks can be delivered in your team’s working language.",
      },
      {
        q: "How long does a training last?",
        a: "From a half-day workshop to a path of several spaced sessions with exercises in between. The spaced path gives better results: reflexes settle by producing, not by listening.",
      },
      {
        q: "What do we keep after the training?",
        a: "The tailored playbooks, the materials, and real content reworked together during the workshops. The goal is explicitly that you no longer need me for the day-to-day.",
      },
      {
        q: "What is the price of a training?",
        a: "By format: number of participants, duration, level of playbook customisation. Quote after a free 20-minute scoping call.",
      },
    ],
    related: ["b2b-content-strategy", "seo-consultant-brussels", "geo-consultant-belgium"],
    serviceType: "SEO Training",
  },
  {
    slug: "monthly-seo-monitoring",
    frSlug: "suivi-seo-mensuel",
    name: "Monthly SEO Monitoring",
    cardText:
      "A full report every month (performance, authority, AI visibility, security) and a 45-minute expert call. You always know where you stand.",
    title: "Monthly SEO Monitoring: full report and expert call every month",
    description:
      "Monthly SEO monitoring: a multi-area report every month (field performance, authority, AI visibility, security) and a 45-minute expert call to decide actions. No length commitment.",
    eyebrow: "Subscription · Monthly monitoring",
    h1Pre: "Your visibility, ",
    h1Mark: "steered month after month",
    intro:
      "SEO and GEO are not one-off projects: algorithms, your competitors and AI engines move continuously. Monthly monitoring combines a multi-area report generated by my tooling and a 45-minute expert call to decide the month’s actions.",
    scopeTitle: "Report, expert reading, decisions: the monthly rhythm",
    scopeCards: [
      {
        title: "Monthly multi-area report",
        text: "Field performance (real users), security, domain authority against competitors, GEO signals: the same analysis depth as the initial audit, replayed every month to measure the trajectory.",
      },
      {
        title: "45-minute expert call",
        text: "Data decides nothing on its own. Every month, we read the report together, identify what moved and why, and settle the two or three actions for the following month.",
      },
      {
        title: "Active monitoring",
        text: "Algorithm updates, AI engine changes, competitor moves: I watch what can affect your visibility and warn you when it concerns you.",
      },
      {
        title: "Direct access",
        text: "A question between two monthly calls? You write, I answer. No ticket, no hotline: one contact who knows your file.",
      },
    ],
    proofTitle: "The same tooling as my enterprise assignments",
    proofText:
      "Monthly reporting relies on the tooling and measurement discipline deployed on assignment at Proximus and the European Parliament: multi-platform monitoring translated into executive reports and decisions, quarter after quarter. Monthly monitoring applies this method at your scale.",
    proofLinks: [{ label: "Proximus case study", href: "/en/case-studies/proximus" }],
    faqTitle: "Frequently asked questions about monthly monitoring",
    faq: [
      {
        q: "What does the monthly report contain?",
        a: "The month’s measured data (field performance, security, authority, GEO signals), their evolution versus previous months, the findings that follow and the proposed priorities. PDF format readable by a non-technician, the same you would show your management.",
      },
      {
        q: "Is there a length commitment?",
        a: "No, it is monthly and cancellable. SEO rewards consistency, and that is precisely why I prefer to keep you through the value of the monitoring rather than a contractual clause.",
      },
      {
        q: "What kind of company is it designed for?",
        a: "SMEs and freelancers who want serious steering of their visibility without hiring, and marketing teams who want a monthly expert view on their data. If your site has no foundation yet, we start with the audit.",
      },
      {
        q: "What is the difference with the audit?",
        a: "The audit is the complete snapshot at a point in time, with its roadmap. Monitoring is the film: it measures whether the trajectory is right, catches regressions and adapts priorities as Google updates and competitors move.",
      },
      {
        q: "Do you also execute the decided actions?",
        a: "Monitoring includes steering and recommendations. Execution can stay with you, or be added occasionally when a piece of work exceeds your resources: we decide action by action, transparently.",
      },
      {
        q: "What is the price of monthly monitoring?",
        a: "A fixed monthly fee, set by scope during the scoping call: site size, number of competitors monitored, languages. No length commitment and no surprise on the invoice.",
      },
    ],
    related: ["seo-audit", "seo-consultant-brussels", "geo-consultant-belgium"],
    serviceType: "SEO Consulting",
  },
  {
    slug: "google-ads-pricing-belgium",
    frSlug: "tarifs-google-ads-belgique",
    landing: true,
    name: "Google Ads Pricing Belgium",
    cardText:
      "How the cost of a Google Ads campaign in Belgium is built: media budget, management fee, what’s included. No hidden percentage on spend.",
    title: "Google Ads Pricing in Belgium: how much a campaign costs in 2026",
    description:
      "Price and cost of a Google Ads campaign in Belgium: media budget, flat management fee, CPC by sector, learning threshold. Clear quote, no hidden commission on spend. Brussels, FR/NL/EN.",
    eyebrow: "Pricing · Google Ads · Belgium",
    h1Pre: "How much a Google Ads campaign costs in Belgium: ",
    h1Mark: "the real breakdown, no hidden percentage",
    intro:
      "The price of a Google Ads campaign breaks down into two distinct items: the media budget paid to Google and the management fee. I bill management as a flat fee, never as a percentage of your spend: this aligns my interest with your cost per lead, not your budget. Here is how the pricing is built, sector by sector.",
    scopeTitle: "Media budget, fee, learning threshold: the breakdown",
    scopeCards: [
      {
        title: "Media budget",
        text: "The money paid directly to Google, a function of your sector’s cost per click in Belgium and the search volume targeted. It belongs to you and stays on your account: you keep the history if the collaboration ends.",
      },
      {
        title: "Management fee",
        text: "A fixed monthly flat fee for account structure, continuous optimisation, tracking and reporting. No commission as a percentage of spend: a model that would push to spend more rather than convert better.",
      },
      {
        title: "Learning threshold",
        text: "Below a certain volume of data, Google’s algorithm cannot learn and optimisation becomes impossible. If your budget cannot reach this threshold, I tell you before we start, and we look at whether SEO isn’t a better first lever.",
      },
      {
        title: "Cost per lead, not per click",
        text: "The only figure that matters is what a qualified contact costs you, not the number of clicks. Tracking is configured before the first euro so this cost is measured, not estimated.",
      },
    ],
    proofTitle: "Budgets managed on results, not on volume",
    proofText:
      "Management of Google Ads and Meta Ads campaigns for a multi-brand e-commerce (Equine Care Group) on ROAS, and B2B lead generation on cost per lead for Groupe Audit Belgium. Two different business models, the same rule: every euro is judged on what it brings back.",
    proofLinks: [
      { label: "Google Ads consultant Belgium", href: "/en/google-ads-consultant-belgium" },
      { label: "Groupe Audit Belgium case study", href: "/en/case-studies/groupe-audit-belgium" },
    ],
    faqTitle: "Frequently asked questions about Google Ads pricing",
    faq: [
      {
        q: "What is the minimum budget for Google Ads in Belgium?",
        a: "It depends on your sector’s cost per click: a competitive B2B or real-estate keyword costs far more than a niche query. The real minimum is not a fixed amount, it is the threshold below which the algorithm lacks data to optimise. I calculate that threshold for your case at scoping, and tell you frankly if Google Ads isn’t the right first lever for your budget.",
      },
      {
        q: "Do you bill a percentage of my advertising budget?",
        a: "No. The management fee is a fixed monthly flat fee, independent of your media spend. The percentage model creates a conflict of interest: it rewards budget increases, not cost-per-lead improvements. The flat fee aligns my work with your profitability.",
      },
      {
        q: "Is the budget paid to Google included in your fee?",
        a: "No, they are two separate things. The media budget is paid directly to Google from your advertising account, which you own. My fee covers management only. So you see exactly where every euro goes.",
      },
      {
        q: "How much does a click cost in Belgium in my sector?",
        a: "Cost per click varies widely: a few cents on low-competition local queries, several euros on B2B, legal, real-estate or financial keywords. The precise estimate for your keywords is done at scoping from your market’s real data, not a misleading average.",
      },
      {
        q: "Is there a length commitment?",
        a: "No. Management is monthly and cancellable. Campaigns need a few weeks of learning to show their measure, which I state at scoping, but nothing locks you in contractually.",
      },
      {
        q: "How do I get a precise quote?",
        a: "Through a free 20-minute scoping call: we look at your sector, your goals and your current situation, and I provide a clear breakdown separating media budget and fee, with no hidden cost.",
      },
    ],
    related: ["google-ads-consultant-belgium", "cro-consultant-belgium", "monthly-seo-monitoring"],
    serviceType: "Pay Per Click Advertising",
  },
  {
    slug: "cro-consultant-belgium",
    frSlug: "consultant-cro-belgique",
    landing: true,
    name: "Conversion Rate Optimisation (CRO)",
    cardText:
      "A/B testing, landing pages and conversion journeys. Raising the conversion rate makes every visit — paid or organic — more profitable.",
    title: "CRO Consultant in Belgium: conversion rate optimisation",
    description:
      "Conversion rate optimisation (CRO) consultant in Belgium: A/B testing, landing pages, conversion journeys and tracking. More leads and sales at constant traffic. Brussels, FR/NL/EN.",
    eyebrow: "CRO · Conversion rate · Belgium",
    h1Pre: "More leads and sales ",
    h1Mark: "without increasing your traffic",
    intro:
      "Conversion rate optimisation (CRO) means turning a larger share of your current visitors into contacts or customers. It is often the most profitable lever: acting on conversion multiplies the value of every euro invested in SEO and Google Ads, durably. I move by measured tests, never by opinions.",
    scopeTitle: "Analysis, tests, journeys: conversion through measurement",
    scopeCards: [
      {
        title: "Friction-point analysis",
        text: "Where your visitors drop off, and why: analysis of journeys, forms, landing pages. We fix what is observed in the data, not what is assumed in a meeting.",
      },
      {
        title: "A/B testing",
        text: "Rigorous comparative tests on the elements that truly weigh: headlines, calls to action, page structure, forms. One decision per test, one test per hypothesis, statistically readable results.",
      },
      {
        title: "Landing pages",
        text: "Landing pages designed for a single intent and a single conversion goal. It is the essential complement to Google Ads: a paid click landing on a weak page is an expense, not a result.",
      },
      {
        title: "Reliable tracking",
        text: "Conversions configured properly, GA4, measured events. Without reliable measurement, optimisation is guesswork: clean tracking is the prerequisite for everything else.",
      },
    ],
    proofTitle: "Test-and-learn on e-commerce and B2B",
    proofText:
      "CRO strategy on a multi-brand e-commerce ecosystem (Equine Care Group) through test-and-learn, A/B testing and funnel optimisation; structuring of lead-capture journeys during the Groupe Audit Belgium rebuild. Two conversion logics, the same measurement discipline.",
    proofLinks: [
      { label: "Equine Care Group case study", href: "/en/case-studies/equine-care-group" },
      { label: "Google Ads consultant Belgium", href: "/en/google-ads-consultant-belgium" },
    ],
    faqTitle: "Frequently asked questions about CRO",
    faq: [
      {
        q: "What is CRO, concretely?",
        a: "CRO (Conversion Rate Optimization) is the set of methods that increase the share of visitors who take the desired action: request a quote, buy, sign up. Instead of seeking more traffic, you draw more value from existing traffic, through analysis, testing and improving journeys.",
      },
      {
        q: "Why is CRO so profitable?",
        a: "Because it acts on a multiplier. Doubling the conversion rate doubles, at constant traffic, the number of leads from your SEO and your paid campaigns. It is often cheaper than buying twice the clicks, and the effect is durable.",
      },
      {
        q: "Does CRO go with Google Ads?",
        a: "The two reinforce each other directly. Improving the landing page lowers your cost per lead at equal budget, and a better conversion rate also improves the Quality Score, hence the cost per click. I often manage both together for this reason.",
      },
      {
        q: "How much traffic is needed for A/B testing?",
        a: "A test needs enough volume to reach statistical significance. On low traffic, we first prioritise obvious high-impact improvements and qualitative journey analysis, then move to comparative tests when volume allows. I tell you what is testable in your case.",
      },
      {
        q: "Do you work throughout Belgium?",
        a: "Yes, I am based in Brussels and work across Belgium, on site or remotely, in French, Dutch and English. I also support clients in France and elsewhere in Europe remotely.",
      },
      {
        q: "What are your rates?",
        a: "By scope, after a free 20-minute scoping call. CRO can be a one-off engagement on a specific journey or a continuous initiative paired with acquisition. The quote describes what is done and what you receive.",
      },
    ],
    related: ["google-ads-consultant-belgium", "web-performance", "web-design-belgium"],
    serviceType: "Conversion Rate Optimization",
  },
  {
    slug: "google-ads-brussels",
    frSlug: "google-ads-bruxelles",
    landing: true,
    name: "Google Ads Brussels",
    cardText:
      "Google Ads campaigns targeted on Brussels, Walloon Brabant and Wallonia: precise geo-targeting, FR/NL ads, managed on cost per lead.",
    title: "Google Ads in Brussels: campaigns targeted on your area",
    description:
      "Google Ads campaigns targeted on Brussels, Walloon Brabant and Wallonia: precise geo-targeting, ads in French and Dutch, managed on cost per lead. For local shops, SMEs and freelancers.",
    eyebrow: "Google Ads · Brussels · Walloon Brabant",
    h1Pre: "Google Ads campaigns that target ",
    h1Mark: "your customers in Brussels and Wallonia",
    intro:
      "For a local business, paying for clicks outside your catchment area is pure leakage. I design geo-targeted Google Ads campaigns on Brussels, Walloon Brabant and Wallonia: precise targeting, ads adapted to the area’s language, budget concentrated where your customers actually search.",
    scopeTitle: "Targeting, language, areas: local managed finely",
    scopeCards: [
      {
        title: "Geographic targeting",
        text: "Campaigns restricted to your real service areas: Brussels municipalities, Walloon Brabant, the Waterloo–Wavre axis, Wallonia. Bid adjustments per area based on each zone’s real value for your business.",
      },
      {
        title: "Language and message",
        text: "Ads in French and Dutch depending on the targeted municipality. In Brussels, the search language is not uniform: matching it to the territory improves click-through rate and cost per lead.",
      },
      {
        title: "Local intent",
        text: "Keywords with geographic and proximity intent, location extensions, hours: capturing the “near me” search at the moment it turns into a call or a visit.",
      },
      {
        title: "Measured on cost per lead",
        text: "Calls, forms, directions: local conversions are configured before the first euro. We judge the campaign on the contacts generated in your area, not on click volume.",
      },
    ],
    proofTitle: "Local, without wasting budget",
    proofText:
      "Based in Brussels, I run acquisition campaigns for Belgian organisations by concentrating budget on the areas and languages that convert. The same measurement discipline as on my e-commerce and B2B assignments, applied at the scale of a local catchment.",
    proofLinks: [
      { label: "Google Ads consultant Belgium", href: "/en/google-ads-consultant-belgium" },
      { label: "Google Ads pricing Belgium", href: "/en/google-ads-pricing-belgium" },
    ],
    faqTitle: "Frequently asked questions about Google Ads in Brussels",
    faq: [
      {
        q: "Can you target only Brussels or my municipality?",
        a: "Yes. Google Ads geographic targeting goes down to the municipality and a radius around an address. We concentrate budget on your real service areas — Brussels, Walloon Brabant, the Waterloo axis, or the precise municipality of your business — so as not to pay for out-of-reach clicks.",
      },
      {
        q: "Do I need ads in French and Dutch in Brussels?",
        a: "Often, yes. Brussels is bilingual and the search language varies by municipality and audience. Adapting the ad language to the targeted area improves click-through rate and relevance, hence cost per lead. We decide based on your real clientele.",
      },
      {
        q: "Do you cover Walloon Brabant and Wallonia?",
        a: "Yes: Walloon Brabant, the Waterloo–Wavre axis, and more broadly Wallonia. Targeting and bids adjust area by area based on each zone’s value for your business.",
      },
      {
        q: "Is Google Ads suitable for a small local shop?",
        a: "It depends on the competition on your keywords and your margin per customer. For many local businesses, a concentrated, well-targeted budget is profitable; for others, local SEO and the business profile are a better first lever. I tell you honestly at scoping.",
      },
      {
        q: "Do you work on site in Brussels?",
        a: "Campaign management is done remotely with regular check-ins, and I travel in and around Brussels when a meeting is useful. I am based in Brussels.",
      },
      {
        q: "How much does a local Google Ads campaign cost?",
        a: "The cost depends on the media budget and the flat management fee. The full breakdown is explained on the Google Ads Pricing Belgium page, and quantified for your case during the scoping call.",
      },
    ],
    related: ["google-ads-consultant-belgium", "google-ads-pricing-belgium", "cro-consultant-belgium"],
    serviceType: "Pay Per Click Advertising",
  },
  {
    slug: "google-ads-by-industry-belgium",
    frSlug: "google-ads-secteurs-belgique",
    landing: true,
    name: "Google Ads by Industry",
    cardText:
      "Google Ads for real estate, hospitality, SMEs and e-commerce in Belgium: account structure, keywords and conversions tailored to each sector.",
    title: "Google Ads by Industry in Belgium: real estate, hospitality, SMEs, e-commerce",
    description:
      "Google Ads tailored to your industry in Belgium: real estate, hospitality, B2B SMEs and e-commerce. Account structure, keywords, conversions and budget built for each sector’s economic reality. Brussels, FR/NL.",
    eyebrow: "Google Ads · By industry · Belgium",
    h1Pre: "Google Ads built for ",
    h1Mark: "your industry’s economic reality",
    intro:
      "An effective Google Ads account does not copy across from one sector to another: the buying cycle, the value of a customer and the competition have nothing in common between a real-estate agency, a restaurant, a B2B SME and an e-commerce. Here is how I adapt the structure, keywords and measurement to each.",
    scopeTitle: "Real estate, hospitality, SMEs, e-commerce: four distinct logics",
    scopeCards: [
      {
        title: "Real estate",
        text: "Long cycle, high value per lead, strong competition on transactional keywords. We target high intent (valuation, mandate, property type and municipality) and care about qualification: better fewer leads, but serious ones.",
      },
      {
        title: "Hospitality",
        text: "Local and immediate intent, tight margin per cover. Geo-targeted campaigns and concrete conversions — bookings, calls, directions — with budget concentrated on the slots and areas that actually fill the room.",
      },
      {
        title: "B2B SMEs",
        text: "Lower search volumes but high contract value. Account tightened on decision-stage queries, measured forms and calls, coordination with SEO so you don’t pay for what you already win organically.",
      },
      {
        title: "E-commerce",
        text: "Managed on ROAS, Shopping and Search campaigns, paired with Meta Ads depending on the buying cycle. On-site conversion (CRO) is part of the equation: a clean product feed and converting pages are worth more than aggressive bidding.",
      },
    ],
    proofTitle: "Several sectors, one measurement method",
    proofText:
      "Multi-brand e-commerce managed on ROAS (Equine Care Group), B2B lead generation on cost per lead (Groupe Audit Belgium), acquisition for higher education (ESTACA). Different sectors and buying cycles, each judged on the indicator that matters to it.",
    proofLinks: [
      { label: "Google Ads consultant Belgium", href: "/en/google-ads-consultant-belgium" },
      { label: "All case studies", href: "/en/case-studies" },
    ],
    faqTitle: "Frequently asked questions about Google Ads by industry",
    faq: [
      {
        q: "Does Google Ads work for real estate in Belgium?",
        a: "Yes, provided you target the right intent. Real estate has strong competition on transactional keywords and high value per mandate: we target high-intent queries (valuation, sale, property type and municipality) and qualify leads so as not to burn budget on non-serious contacts.",
      },
      {
        q: "Is Google Ads profitable for hospitality?",
        a: "It depends on your margin and your area. Hospitality has local and immediate intent: geo-targeted campaigns with concrete conversions (bookings, calls, directions) can be profitable, but on tight margins, local SEO and the business profile are sometimes a better first lever. I say so honestly at scoping.",
      },
      {
        q: "My B2B SME sector has low search volume, is that a problem?",
        a: "Not necessarily. Low volume paired with high contract value often justifies an account tightened on the most decision-stage queries. The point is not the number of clicks but lead quality; we measure cost per lead, not volume.",
      },
      {
        q: "Do you manage e-commerce and Shopping campaigns?",
        a: "Yes: Shopping and Search campaigns managed on ROAS, paired with Meta Ads depending on the buying cycle. I also factor in on-site conversion (CRO) and product-feed quality, because converting pages are worth more than aggressive bidding.",
      },
      {
        q: "What if my sector isn’t in this list?",
        a: "The method adapts: legal, health, training, services… We always start from your buying cycle, the value of a customer and the competition on your keywords to build the right account structure. These four sectors are examples, not a limit.",
      },
      {
        q: "How much does a campaign cost in my sector?",
        a: "Cost per click varies widely between sectors, and the budget is made of media plus the flat management fee. The breakdown is on the Google Ads Pricing Belgium page, and the precise quote is done at scoping.",
      },
    ],
    related: ["google-ads-consultant-belgium", "google-ads-pricing-belgium", "cro-consultant-belgium"],
    serviceType: "Pay Per Click Advertising",
  },
];

export function getExpertiseEn(slug: string): ExpertiseEn | undefined {
  return EXPERTISES_EN.find((e) => e.slug === slug);
}

/** Expertises EN affichées dans la nav/footer/grille (exclut les landing). */
export const CORE_EXPERTISES_EN: ExpertiseEn[] = EXPERTISES_EN.filter((e) => !e.landing);
