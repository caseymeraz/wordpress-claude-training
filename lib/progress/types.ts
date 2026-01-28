/**
 * Progress tracking types for training exercises and assessments
 */

export interface ExerciseProgress {
  completed: boolean;
  completedAt?: string;
}

export interface QuizScore {
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface WeekProgress {
  exercises: Record<string, ExerciseProgress>;
  quizzes: Record<string, QuizScore>;
  comfortLevel?: number; // 1-10 scale
  comfortLevelUpdatedAt?: string;
}

export interface ProgressState {
  weekProgress: Record<string, WeekProgress>;
}

export interface ProgressStore extends ProgressState {
  // Exercise tracking
  toggleExercise: (weekId: string, exerciseId: string) => void;
  isExerciseCompleted: (weekId: string, exerciseId: string) => boolean;
  getWeekCompletionPercentage: (weekId: string, totalExercises: number) => number;

  // Quiz tracking
  setQuizScore: (weekId: string, quizId: string, score: number, totalQuestions: number) => void;
  getQuizScore: (weekId: string, quizId: string) => QuizScore | undefined;

  // Comfort level
  setComfortLevel: (weekId: string, level: number) => void;
  getComfortLevel: (weekId: string) => number | undefined;

  // Export/Import
  exportProgress: () => string;
  importProgress: (data: string) => boolean;
  resetProgress: () => void;

  // Overall stats
  getTotalCompletionPercentage: () => number;
}
