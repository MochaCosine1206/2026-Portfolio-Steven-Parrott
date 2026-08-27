import { Job, SkillCategory, Education, FeaturedProject } from './types';

export const EMAIL = "steven.parrott@gmail.com";
export const RESUME_SUMMARY = `
Founder and Full-Stack Software Developer with proven expertise building and launching production SaaS platforms. 
Shipped a production RAG platform and an enterprise ChatGPT integration built on the Model Context Protocol, and builds agentic development tooling — multi-agent orchestration and ticket-to-PR harnesses with human-in-the-loop gates.
Experienced in delivering complex projects for high-profile clients including MasterCard, Telus, Ascensus, and Edward Jones.
`;

export const SKILLS: SkillCategory[] = [
  { title: "Languages", skills: ["TypeScript", "Python", "GLSL", "SQL", "HTML/CSS"] },
  { title: "Frontend", skills: ["React 19", "Next.js 14", "React Flow", "Three.js/R3F", "Tailwind"] },
  { title: "Backend & AI", skills: ["FastAPI", "LangGraph", "Temporal", "Django", "Node.js", "OpenAI/Anthropic APIs"] },
  { title: "Infra & Tools", skills: ["AWS (ECS/Fargate)", "Docker", "PostgreSQL (pgvector)", "Redis", "LocalStack"] }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Agentic Development Harness",
    subtitle: "Ticket-to-PR Automation with Human-in-the-Loop Gates",
    description: "Drives a work ticket end-to-end across three production service repositories: verifies the ticket's claims against the codebase before writing anything, implements on an isolated branch, proves every acceptance criterion against a live endpoint, runs the quality gate, then opens the pull requests. The hard part is the gating \u2014 it proceeds autonomously when the ticket is followed strictly, and stops for human approval the moment a decision falls outside what the ticket specified. Paired with a verification rule that forbids inferred test coverage: each acceptance criterion is tagged observed-live, directly-tested, or not-verified, so the system can never report a pass it did not actually see.",
    techStack: [
      { category: "Harness", items: ["Claude Code", "Conditional HITL Gating", "Multi-repo Orchestration"] },
      { category: "Verification", items: ["Live AC Testing", "No-Inferred-Coverage Rule", "Offline Sonar Gate"] },
      { category: "Stack", items: ["TypeScript", "NestJS", "GraphQL", "Jest"] }
    ],
    features: [
      "Conditional autonomy: strict ticket execution proceeds; out-of-scope decisions stop and report; genuine uncertainty defaults to stopping.",
      "No inferred verification: every acceptance criterion must be directly exercised against a real endpoint, or it is labelled not-verified.",
      "Multi-agent sprint audit: one agent per ticket for complexity assessment, then an independent adversarial skeptic to refute those findings against the code.",
      "Offline quality gate replicating a SonarQube PR analysis, scoped to changed files, catching cognitive-complexity failures pre-commit."
    ]
  },
  {
    title: "Shaderz.io",
    subtitle: "Real-time GPU Shader Engine",
    url: "https://shaderz.io",
    description: "A high-performance web application that applies real-time GPU shader effects to text, images, and videos. Features a custom graphics engine capable of instant media export.",
    techStack: [
      { category: "Core", items: ["React 19", "Three.js (R3F)", "WebGL", "GLSL"] },
      { category: "Mobile", items: ["Capacitor", "Ionic"] },
      { category: "Performance", items: ["Vite", "Cloudflare Workers"] }
    ],
    features: [
      "Core Graphics Engine: Custom WebGL engine supporting 69+ unique effects (Neon, Hologram, Oil Painting).",
      "Cross-Platform: Web, iOS, and Android builds via Capacitor.",
      "Instant Export: Client-side media pipeline for PNG, WebM, and GIF generation."
    ]
  },
  {
    title: "GlassBox OS",
    subtitle: "Visual Multi-Agent Workflow Orchestrator",
    description: "A visual workflow builder for multi-agent AI systems with real-time observability. Users design AI workflows on a drag-and-drop canvas, which the system compiles into executable LangGraph state machines. Built as a working prototype; shelved in favour of a Go orchestrator built for daily use. Built on the 'Glass Box' philosophy to provide full transparency into AI decision-making.",
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "React Flow", "SSE Streaming", "TypeScript"] },
      { category: "Backend", items: ["FastAPI", "LangGraph", "LangChain", "Temporal"] },
      { category: "AI / LLM", items: ["Multi-Provider (OpenAI, Claude, Gemini)", "Reflexion Pattern", "MCP"] },
      { category: "Infra", items: ["PostgreSQL + pgvector", "Redis Pub/Sub", "LocalStack", "Docker"] }
    ],
    features: [
      "Visual Workflow Builder: Drag-and-drop canvas for designing pipelines with 'Time Travel' debugging.",
      "Dynamic Graph Compilation: JSON definitions compiled to LangGraph state machines at runtime.",
      "Reflexion Pattern: Self-correcting agents that generate code, test it, and iterate on failures.",
      "Multi-Model Resilience: Automatic fallback chains (Claude -> GPT-4o -> Gemini) for outage protection."
    ]
  }
];

export const EXPERIENCE: Job[] = [
  {
    company: "Plyne Technologies",
    role: "Founder & AI Engineer",
    period: "Jan 2024 - Present",
    location: "Oak Ridge, TN",
    logoId: "plyne",
    isCurrent: true,
    description: "Founded, shipped and ran an AI-powered chat widget SaaS platform \u2014 a production RAG system answering customer questions from a company\u2019s own site content. Sunset when traffic no longer justified the infrastructure cost.",
    projects: [
      {
        name: "Infrastructure",
        description: "Designed microservices architecture on AWS ECS Fargate with 7 containerized services, RDS, ElastiCache, and Qdrant vector DB.",
        tech: ["AWS ECS", "Docker", "PostgreSQL", "Redis", "Qdrant"]
      },
      {
        name: "Full-Stack Dev",
        description: "Built React admin dashboard with Vite/TypeScript and Python backend services using FastAPI and LangChain.",
        tech: ["React", "TypeScript", "FastAPI", "LangChain", "Stripe"]
      }
    ]
  },
  {
    company: "Telus Digital",
    role: "Senior Software Engineer",
    period: "Dec 2021 - Present",
    location: "Remote",
    logoId: "willowtree",
    isCurrent: true,
    description: "Supporting enterprise-level application initiatives for major Fortune 500 clients.",
    projects: [
      {
        name: "Best Western Hotels",
        description: "Backend engineering on the service layer: GraphQL BFFs and NestJS services across three repos, with per-request DataLoader batching, strict web/mobile payload parity, and a clean SonarQube gate on every PR.",
        tech: ["NestJS", "GraphQL", "TypeScript", "DataLoader", "SonarQube"]
      },
      {
        name: "MarketWatch",
        description: "Led the production-ready ChatGPT integration using Model Context Protocol (MCP) for real-time financial data.",
        tech: ["React 18", "GraphQL", "Jest", "WCAG 2.2"]
      },
      {
        name: "Edward Jones",
        description: "Built major customer facing search-by-location feature using Next.JS and Google Maps API.",
        tech: ["Next.js", "Google Maps API"]
      },
      {
        name: "Telus Digital",
        description: "Created major features for a global AI annotator React app replacing Sharepoint. Developed developer tooling for React Native.",
        tech: ["React", "React Native", "Tooling"]
      },
      {
        name: "Fox Entertainment",
        description: "Developed comprehensive video editorial review platform with real-time editing and approval workflows.",
        tech: ["Next.js", "TypeScript", "Video Processing"]
      },
      {
        name: "Mastercard & Ascensus",
        description: "Led analytics implementation (Mastercard) and supported major Ionic Angular upgrades with complex auth flows (Ascensus).",
        tech: ["Angular", "Ionic", "Springboot"]
      }
    ]
  },
  {
    company: "Revel Systems",
    role: "Software Engineer II",
    period: "May 2021 - Dec 2021",
    location: "Atlanta, GA",
    logoId: "revel",
    description: "Backend development in Django on a distributed team.",
    projects: [
      {
        name: "Django Backend",
        description: "Enhanced and debugged the Django backend, identifying and resolving critical bugs that improved system reliability and user experience.",
        tech: ["Django", "Python", "PostgreSQL"]
      },
      {
        name: "Distributed Collaboration",
        description: "Worked with engineering teams across Russia and Lithuania, delivering on schedule across time zones.",
        tech: ["Remote", "Agile"]
      }
    ]
  },
  {
    company: "University of Virginia",
    role: "Full Stack Developer (Frank Batten School)",
    period: "Jul 2019 - Jul 2021",
    location: "Charlottesville, VA",
    logoId: "uva",
    description: "Full-stack developer at the Center for Leadership Simulation and Gaming.",
    projects: [
      {
        name: "App Portfolio Management",
        description: "Managed a portfolio of React/Django applications \u2014 maintenance, upgrades, and new development.",
        tech: ["React", "Django", "Python"]
      },
      {
        name: "AWS Migration",
        description: "Led migration of application infrastructure to AWS, improving scalability and reliability while lowering operating cost.",
        tech: ["AWS", "Infrastructure"]
      },
      {
        name: "Engineering Process",
        description: "Instituted disciplined issue, commit, and pull-request practices that improved code quality and team collaboration.",
        tech: ["Git", "GitHub"]
      }
    ]
  }
];

export const EDUCATION: Education[] = [
  { school: "University of Arizona", degree: "Full Stack Coding Boot Camp", logoId: "ua" },
  { school: "Arizona State University", degree: "Masters in TESOL", logoId: "asu" },
  { school: "University of North Texas", degree: "BA - Creative Writing", logoId: "unt" }
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for Steven Parrott's portfolio website. 
Your goal is to answer questions about Steven's professional experience, skills, and projects based strictly on the following resume data.
Be concise, professional, but enthusiastic. Use a tone that fits a senior engineer.

RESUME DATA:
${RESUME_SUMMARY}

FEATURED PROJECTS:
${JSON.stringify(FEATURED_PROJECTS)}

EXPERIENCE:
${JSON.stringify(EXPERIENCE)}

SKILLS:
${JSON.stringify(SKILLS)}

EDUCATION:
${JSON.stringify(EDUCATION)}

If asked about contact info: ${EMAIL}
If asked about specific technologies, highlight where he used them in his projects.
`;