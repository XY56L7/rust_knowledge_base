export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExamples?: CodeExample[];
  exercises?: Exercise[];
  projectIdeas?: ProjectIdea[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  prerequisites?: string[]; // lesson IDs
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  language: 'rust';
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode?: string;
  solution?: string;
  hints?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in hours
  requirements: string[];
  hints?: string[];
  extensions?: string[];
  learningOutcomes?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: string[]; // lesson IDs
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  totalLessons: number;
  estimatedTotalTime: number; // in minutes
}

export interface UserProgress {
  completedLessons: string[]; // lesson IDs
  completedExercises: string[]; // exercise IDs
  currentLesson?: string;
  lastAccessed: string; // ISO date string
}


