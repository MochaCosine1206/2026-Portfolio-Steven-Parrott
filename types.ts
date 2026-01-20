export interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  logoId?: string; // Reference to internal SVG asset
  logoDomain?: string; // Fallback
  url?: string; // Link to live project
  description: string;
  projects?: Project[];
  isCurrent?: boolean;
}

export interface Project {
  name: string;
  description: string;
  tech?: string[];
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface FeaturedProject {
  title: string;
  subtitle: string;
  description: string;
  url?: string;
  techStack: TechCategory[];
  features: string[];
  architecture?: string; // Optional description of architecture
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Education {
  school: string;
  degree: string;
  logoId?: string;
}
