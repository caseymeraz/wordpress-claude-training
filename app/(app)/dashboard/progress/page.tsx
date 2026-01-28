'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/lib/progress/store';

export default function ProgressPage() {
  const { weekProgress, getTotalCompletionPercentage } = useProgressStore();
  const totalCompletion = getTotalCompletionPercentage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your completion across all 6 weeks of training
        </p>
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Completion</CardTitle>
          <CardDescription>
            Your progress across all training weeks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Progress</span>
            <span className="text-2xl font-bold">{totalCompletion}%</span>
          </div>
          <Progress value={totalCompletion} className="h-3" />
        </CardContent>
      </Card>

      {/* Week-by-week progress */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((weekNum) => {
          const weekId = `week-${weekNum}`;
          const weekData = weekProgress[weekId];
          const exerciseCount = weekData ? Object.keys(weekData.exercises).length : 0;
          const completedCount = weekData
            ? Object.values(weekData.exercises).filter((ex) => ex.completed).length
            : 0;
          const percentage = exerciseCount > 0 ? Math.round((completedCount / exerciseCount) * 100) : 0;

          return (
            <Card key={weekNum}>
              <CardHeader>
                <CardTitle className="text-lg">Week {weekNum}</CardTitle>
                <CardDescription>
                  {completedCount} of {exerciseCount || 0} exercises completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={percentage} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Export/Import section */}
      <Card>
        <CardHeader>
          <CardTitle>Export / Import Progress</CardTitle>
          <CardDescription>
            Save your progress or restore from a previous export
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Export/import functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
