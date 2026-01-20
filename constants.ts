import { Job, SkillCategory, Education, FeaturedProject } from './types';

export const EMAIL = "steven.parrott@gmail.com";
export const RESUME_SUMMARY = `
Founder and Full-Stack Software Developer with proven expertise building and launching production SaaS platforms. 
Creator of GlassBox OS, a multi-agent AI orchestrator, and Plyne.io, an AI-powered chat widget platform.
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
    description: "A visual workflow builder for multi-agent AI systems with real-time observability. Users design AI workflows on a drag-and-drop canvas, and the system compiles them into executable state machines that run autonomously. Built on the 'Glass Box' philosophy to provide full transparency into AI decision-making.",
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
    company: "Plyne.IO",
    role: "Founder & CEO",
    period: "Jan 2024 - Present",
    location: "Oak Ridge, TN",
    logoId: "plyne",
    url: "https://plyne.io",
    isCurrent: true,
    description: "Founded and launched an AI-powered chat widget SaaS platform enabling instant 24/7 customer support.",
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
    role: "Web Platform Engineer",
    period: "Dec 2021 - Present",
    location: "Remote",
    logoId: "willowtree",
    isCurrent: true,
    description: "Supporting enterprise-level application initiatives for major Fortune 500 clients.",
    projects: [
      {
        name: "MarketWatch",
        description: "Leading production-ready ChatGPT integration using Model Context Protocol (MCP) for real-time financial data.",
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
    description: "Backend Development in Django. Improved system reliability and user experience by resolving critical bugs. Collaborated with global remote teams.",
    projects: []
  },
  {
    company: "University of Virginia",
    role: "Full Stack Developer (Frank Batten School)",
    period: "Jul 2019 - Jul 2021",
    location: "Charlottesville, VA",
    logoId: "uva",
    description: "Managed portfolio of React/Django applications. Led migration of infrastructure to AWS. Improved GitHub workflows.",
    projects: []
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