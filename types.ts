
export enum ModuleStep {
  INTRO = 'INTRO',
  LESSON_4_1 = 'LESSON_4_1',
  LESSON_4_2 = 'LESSON_4_2',
  PROJECT = 'PROJECT',
  QUIZ = 'QUIZ',
  COMPLETED = 'COMPLETED'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

export interface VariableState {
  score: number;
  timer: number;
  gameStarted: number;
}
