'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProgressStore } from './types';

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      weekProgress: {},

      // Toggle exercise completion
      toggleExercise: (weekId: string, exerciseId: string) => {
        set((state) => {
          const weekData = state.weekProgress[weekId] || { exercises: {}, quizzes: {} };
          const currentStatus = weekData.exercises[exerciseId]?.completed || false;

          return {
            weekProgress: {
              ...state.weekProgress,
              [weekId]: {
                ...weekData,
                exercises: {
                  ...weekData.exercises,
                  [exerciseId]: {
                    completed: !currentStatus,
                    completedAt: !currentStatus ? new Date().toISOString() : undefined,
                  },
                },
              },
            },
          };
        });
      },

      // Check if exercise is completed
      isExerciseCompleted: (weekId: string, exerciseId: string) => {
        const state = get();
        return state.weekProgress[weekId]?.exercises[exerciseId]?.completed || false;
      },

      // Get week completion percentage
      getWeekCompletionPercentage: (weekId: string, totalExercises: number) => {
        if (totalExercises === 0) return 0;
        const state = get();
        const weekData = state.weekProgress[weekId];
        if (!weekData) return 0;

        const completedCount = Object.values(weekData.exercises).filter(
          (ex) => ex.completed
        ).length;

        return Math.round((completedCount / totalExercises) * 100);
      },

      // Set quiz score
      setQuizScore: (weekId: string, quizId: string, score: number, totalQuestions: number) => {
        set((state) => {
          const weekData = state.weekProgress[weekId] || { exercises: {}, quizzes: {} };

          return {
            weekProgress: {
              ...state.weekProgress,
              [weekId]: {
                ...weekData,
                quizzes: {
                  ...weekData.quizzes,
                  [quizId]: {
                    score,
                    totalQuestions,
                    completedAt: new Date().toISOString(),
                  },
                },
              },
            },
          };
        });
      },

      // Get quiz score
      getQuizScore: (weekId: string, quizId: string) => {
        const state = get();
        return state.weekProgress[weekId]?.quizzes[quizId];
      },

      // Set comfort level
      setComfortLevel: (weekId: string, level: number) => {
        set((state) => {
          const weekData = state.weekProgress[weekId] || { exercises: {}, quizzes: {} };

          return {
            weekProgress: {
              ...state.weekProgress,
              [weekId]: {
                ...weekData,
                comfortLevel: level,
                comfortLevelUpdatedAt: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Get comfort level
      getComfortLevel: (weekId: string) => {
        const state = get();
        return state.weekProgress[weekId]?.comfortLevel;
      },

      // Export progress as JSON string
      exportProgress: () => {
        const state = get();
        return JSON.stringify(
          {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            data: state.weekProgress,
          },
          null,
          2
        );
      },

      // Import progress from JSON string
      importProgress: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.version && parsed.data) {
            set({ weekProgress: parsed.data });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Failed to import progress:', error);
          return false;
        }
      },

      // Reset all progress
      resetProgress: () => {
        set({ weekProgress: {} });
      },

      // Get total completion percentage across all weeks
      getTotalCompletionPercentage: () => {
        const state = get();
        const weeks = Object.keys(state.weekProgress);
        if (weeks.length === 0) return 0;

        // Assume each week has roughly the same number of exercises
        // For accurate calculation, we'd need to know total exercises per week
        const weekPercentages = weeks.map((weekId) => {
          const weekData = state.weekProgress[weekId];
          const completedCount = Object.values(weekData.exercises).filter(
            (ex) => ex.completed
          ).length;
          const totalCount = Object.keys(weekData.exercises).length;
          return totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        });

        const average = weekPercentages.reduce((a, b) => a + b, 0) / weekPercentages.length;
        return Math.round(average);
      },
    }),
    {
      name: 'claude-training-progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
