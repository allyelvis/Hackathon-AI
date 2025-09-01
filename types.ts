
export enum View {
  Dashboard = 'Dashboard',
  Submissions = 'Submissions',
  Winners = 'Winners',
  Analytics = 'Analytics',
  Settings = 'Settings',
}

export enum ProjectStatus {
  InProgress = 'In Progress',
  Submitted = 'Submitted',
  Judging = 'Judging',
  Winner = 'Winner',
  Finalist = 'Finalist',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamMembers: string[];
  submissionTime: Date;
  status: ProjectStatus;
  repoUrl: string;
  demoUrl: string;
}

export interface GeminiAnalysis {
  summary: string;
  innovationScore: number;
  technicalComplexityScore: number;
  businessPotentialScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestedQuestions: string[];
}
