export type SkillLevel = 'Beginner' | 'Learning' | 'Intermediate';

export type SkillCategory = 'programming' | 'ai-ml' | 'web-dev' | 'creative-tech';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  iconName: string;
  shortDesc: string;
  learningStatus: string;
  topics: string[];
  relatedProjects: string[];
  colorAccent: string;
}

export type ProjectStatus = 'Concept' | 'In Progress' | 'Completed';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  category: 'ai' | 'web' | 'gaming' | 'programming' | 'creative';
  technologies: string[];
  featured: boolean;
  highlights: string[];
  conceptArchitecture: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  interactiveDemoType: 'chatbot' | 'studio' | 'portfolio' | 'business' | 'gaming' | 'code';
}

export interface MilestoneItem {
  year: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  reflection: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}
