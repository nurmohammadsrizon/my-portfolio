// Single source of truth for all portfolio content.
// Everything below is drawn from the supplied resume and project documents.

export const profile = {
  name: "Nur Mohammad Srizon",
  firstName: "Nur Mohammad",
  lastName: "Srizon",
  roles: ["AI Engineer", "Backend Developer", "Python Software Developer"],
  headline: "I build AI systems and backends that think in architecture.",
  intro:
    "Developer focused on AI engineering, high-performance backend systems, APIs and Python software. I build from architecture and APIs through databases, automation and practical user-facing software.",
  location: "Mymensingh, Bangladesh",
  email: "iamsrizon122@gmail.com",
  links: {
    github: "https://github.com/nurmohammadsrizon",
    linkedin: "https://linkedin.com/in/nur-mohammad-srizon-15a8a741b/",
    portfolio: "https://nmssrizon.netlify.app",
  },
};

export const about = {
  lead:
    "My flagship project, LifeOS, is an AI-powered Life Operating System concept combining personalized AI, privacy-aware activity intelligence, productivity analytics, dashboards and scalable backend infrastructure.",
  paragraphs: [
    "I'm a young software developer working mainly in Python. My interest sits where AI products meet solid backend engineering: FastAPI services, database-backed applications, authentication flows and the automation that holds a system together.",
    "I like turning an idea into a structured architecture first (APIs, data models, security boundaries) and only then into interfaces people actually use. That habit shows up in everything from my e-commerce backend to my desktop AI assistant.",
  ],
  problems: [
    "Turning raw activity signals into useful, actionable insight",
    "Designing privacy-aware, permission-first data collection",
    "Structuring backends that stay maintainable as they grow",
    "Making AI assistants practical on a real desktop",
  ],
  goal:
    "Building toward professional software engineering with a focus on AI systems, Python backend development, scalable applications, database engineering and product-oriented software architecture.",
  education: "Secondary School Certificate (SSC), plus diploma-level technical learning and hands-on software development.",
};

export type SkillGroup = {
  title: string;
  accent: "electric" | "violet" | "cyan" | "magenta";
  icon: "brain" | "server" | "code" | "database" | "layout" | "terminal" | "shield" | "cpu";
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Engineering",
    accent: "magenta",
    icon: "brain",
    blurb: "Personalised AI direction, reasoning layers and assistants.",
    items: ["AI Engineering", "LLM concepts", "Custom / Llama-based AI", "Speech recognition", "Text-to-speech"],
  },
  {
    title: "Backend",
    accent: "electric",
    icon: "server",
    blurb: "API-first services with clear module boundaries.",
    items: ["Python", "FastAPI", "Django", "REST APIs", "Backend architecture", "Rate limiting (SlowAPI)", "File uploads"],
  },
  {
    title: "Programming",
    accent: "violet",
    icon: "code",
    blurb: "Strong Python foundations with problem-solving practice.",
    items: ["Python", "Advanced Python modules", "DSA", "JavaScript", "C++"],
  },
  {
    title: "Databases",
    accent: "cyan",
    icon: "database",
    blurb: "Structured data design behind real applications.",
    items: ["SQL", "Database design", "PostgreSQL", "MongoDB", "JSON-based storage"],
  },
  {
    title: "Auth & Security",
    accent: "violet",
    icon: "shield",
    blurb: "Permission-aware thinking applied from the start.",
    items: ["Authentication", "Authorization", "Permission-aware design", "Request validation"],
  },
  {
    title: "Frontend & Desktop",
    accent: "electric",
    icon: "layout",
    blurb: "Interfaces wired to real backend APIs.",
    items: ["React", "Modern web interfaces", "Qt6 / PySide", "CMake"],
  },
  {
    title: "Systems & Tools",
    accent: "cyan",
    icon: "terminal",
    blurb: "Linux-first workflow with automation everywhere.",
    items: ["Linux", "Bash", "Automation", "System-level integrations", "Git workflow", "VS Code", "PyCharm"],
  },
];

export const lifeos = {
  title: "LifeOS",
  subtitle: "AI-powered Life Operating System",
  description:
    "A long-term platform combining personal AI, device and activity intelligence, productivity analytics, privacy controls and scalable backend infrastructure.",
  layers: [
    {
      key: "AI Core",
      text: "Custom / Llama-based intelligence layer for personalized reasoning, analysis and assistance.",
    },
    {
      key: "Data Layer",
      text: "Structured collection, processing, storage and analytics pipelines for activity and productivity data.",
    },
    {
      key: "Insight Engine",
      text: "Transforms signals into focus, distraction, goal-progress and performance insights.",
    },
    {
      key: "Device Signals",
      text: "App usage, screen/context signals, movement/activity and optional camera/microphone inputs, only with permission.",
    },
    {
      key: "Privacy",
      text: "Permission-aware architecture, user control, sensitive-data boundaries and transparent collection.",
    },
    {
      key: "Scale",
      text: "Backend architecture designed with the long-term goal of supporting very large user populations.",
    },
  ],
  flow: ["Client layer", "Secure API", "Backend services", "Data & analytics", "AI analysis", "Dashboards"],
};

export type Project = {
  num: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    num: "02",
    title: "Full-Stack E-Commerce Platform",
    tag: "Backend · API",
    description:
      "Python + FastAPI backend with authentication, authorization, database design and API architecture, integrated with a React front end. Includes product records, image uploads, file storage workflows and SlowAPI rate limiting.",
    stack: ["Python", "FastAPI", "PostgreSQL", "React"],
  },
  {
    num: "03",
    title: "Jarvis AI Assistant",
    tag: "AI · Automation",
    description:
      "Speech recognition, bilingual English/Bangla interaction goals, TTS, automation, system-level controls and AI-powered commands on Linux.",
    stack: ["Python", "Speech", "TTS", "PyAutoGUI"],
  },
  {
    num: "04",
    title: "Video Downloader App",
    tag: "Python · Software",
    description:
      "Media retrieval workflow, application logic, user interaction and practical Python software development.",
    stack: ["Python"],
  },
  {
    num: "05",
    title: "UltraStudy",
    tag: "Productivity",
    description: "A Python application concept for study and productivity workflows with a more polished user experience.",
    stack: ["Python"],
  },
  {
    num: "06",
    title: "Newton's Laws Website",
    tag: "Education · Web",
    description: "An educational web project presenting Newton's laws in an accessible, interactive format.",
    stack: ["Web"],
  },
  {
    num: "07",
    title: "Other Mini Projects",
    tag: "Experiments",
    description:
      "API integrations, automation utilities, productivity tools, Python experiments, frontend interfaces and more.",
    stack: ["Python", "APIs", "Automation"],
  },
];

export const strengths = [
  "System thinking & architecture",
  "API-first backend development",
  "AI product engineering",
  "Database-backed applications",
  "Automation & Linux tooling",
  "Project-driven problem solving",
];
