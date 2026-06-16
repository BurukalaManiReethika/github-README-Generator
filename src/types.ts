export type EditorMode = 'profile' | 'repository';

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  pronouns: string;
  githubUsername: string;
  linkedinUsername: string;
  twitterUsername: string;
  portfolioUrl: string;
  devtoUsername: string;
  mediumUsername: string;
  emailAddress: string;
  workingOn: string;
  learning: string;
  collaboratingOn: string;
  askMeAbout: string;
  funFact: string;
  techs: string[]; // List of tech keys
  showStats: boolean;
  showLangs: boolean;
  showStreak: boolean;
  statsTheme: string;
  visitorsBadge: boolean;
  visitorsBadgeColor: string;
  quoteCard: boolean;
  quoteTheme: string;
}

export interface RepoData {
  projectName: string;
  tagline: string;
  githubUsername: string;
  repoName: string;
  license: string;
  version: string;
  nodeVersion: string;
  buildStatus: boolean;
  prsWelcome: boolean;
  features: string[];
  prerequisites: string;
  installation: string;
  usage: string;
  contributing: string;
  authorName: string;
  authorEmail: string;
  demoUrl: string;
  technologies: string[];
}

export interface TechItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools' | 'database_cloud';
  iconSvg?: string; // Simplifies preview visuals
  badgeLabel: string;
  badgeColor: string;
  badgeLogo: string;
}
