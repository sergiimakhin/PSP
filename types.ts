export interface TimelineDataPoint {
  year: number;
  humanShare: number;
  aiShare: number;
  description?: string;
}

export interface SubfieldAnalysis {
  name: string;
  riskScore: number; // 0-100
  impactDescription: string;
  automationType: 'Augmentation' | 'Replacement' | 'New Creation';
}

export interface SkillRecommendation {
  skill: string;
  relevance: string; // 'High' | 'Medium' | 'Low'
  category: 'Technical' | 'Soft Skill' | 'Strategic';
}

export interface ProfessionAnalysis {
  jobTitle: string;
  summary: string;
  overallRiskScore: number; // 0-100
  timeline: TimelineDataPoint[];
  subfields: SubfieldAnalysis[];
  skillsToSurvive: SkillRecommendation[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING_VISUALS = 'GENERATING_VISUALS',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}