export interface GameChallenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  starterCode: string;
  solution: string;
  tests: TestCase[];
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  achievementId?: string;
}

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface GameProgress {
  userId?: string;
  completedChallenges: string[];
  currentLevel: number;
  totalXP: number;
  achievements: Achievement[];
  zombiesCreated: number;
  lastPlayed: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GameLesson {
  id: string;
  chapter: number;
  title: string;
  description: string;
  challenges: GameChallenge[];
  story: string;
  unlocked: boolean;
}

export interface CodeValidationResult {
  success: boolean;
  errors: string[];
  testResults: TestResult[];
  passed: number;
  total: number;
}

export interface TestResult {
  testId: string;
  passed: boolean;
  error?: string;
  output?: string;
}

