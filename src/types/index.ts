export type UserRole = 'candidate' | 'company' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Candidate extends User {
  role: 'candidate';
  name: string;
  bio: string;
  location: string;
  skills: Skill[];
  avatar?: string;
}

export interface Company extends User {
  role: 'company';
  name: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  logo?: string;
  customTests?: CustomTest[];
}

export interface Admin extends User {
  role: 'admin';
  name: string;
}

export interface Skill {
  language: ProgrammingLanguage;
  level: SkillLevel;
  isValidated: boolean;
  score?: number;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ProgrammingLanguage = 
  | 'JavaScript'
  | 'TypeScript'
  | 'Python'
  | 'Java'
  | 'C#'
  | 'PHP'
  | 'Ruby'
  | 'Go'
  | 'Swift'
  | 'Kotlin'
  | 'Rust'
  | 'HTML/CSS';

export interface TestQuestion {
  id: string;
  language: ProgrammingLanguage;
  difficulty: SkillLevel;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  createdBy?: string;
  estimatedTime?: number;
}

export interface TestResult {
  candidateId: string;
  language: ProgrammingLanguage;
  level: SkillLevel;
  score: number;
  isPassed: boolean;
  date: Date;
  startTime: Date;
  endTime: Date;
  timeSpent: number;
}

export interface CustomTest {
  id: string;
  companyId: string;
  title: string;
  description: string;
  language: ProgrammingLanguage;
  difficulty: SkillLevel;
  questions: TestQuestion[];
  invitedCandidates: string[];
  estimatedDuration: number;
}