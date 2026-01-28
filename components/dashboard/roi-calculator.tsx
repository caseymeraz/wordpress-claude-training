'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(75);
  const [hoursPerDev, setHoursPerDev] = useState(65);

  const monthlyTimeSavings = teamSize * hoursPerDev;
  const monthlyValue = monthlyTimeSavings * hourlyRate;
  const licenseCost = teamSize * 200;
  const netROI = monthlyValue - licenseCost;
  const roiPercentage = ((netROI / licenseCost) * 100).toFixed(0);
  const yearOneROI = (netROI * 12).toFixed(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
        <CardDescription>
          Calculate your potential return on investment with Claude Code training
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Input
              id="teamSize"
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              min={1}
              max={50}
            />
            <p className="text-xs text-muted-foreground">Number of developers</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              min={0}
              step={5}
            />
            <p className="text-xs text-muted-foreground">Average dev hourly rate</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoursPerDev">Hours Saved/Month</Label>
            <Input
              id="hoursPerDev"
              type="number"
              value={hoursPerDev}
              onChange={(e) => setHoursPerDev(Number(e.target.value))}
              min={0}
              step={5}
            />
            <p className="text-xs text-muted-foreground">Per developer</p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Monthly Time Savings:</span>
            <span className="font-semibold">{monthlyTimeSavings} hours</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Monthly Value:</span>
            <span className="font-semibold">${monthlyValue.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">License Cost:</span>
            <span className="font-semibold">${licenseCost.toLocaleString()}/mo</span>
          </div>

          <div className="h-px bg-border my-2" />

          <div className="flex justify-between items-center">
            <span className="font-bold">Net Monthly ROI:</span>
            <span className="text-2xl font-bold text-primary">
              ${netROI.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Return on Investment:</span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              {roiPercentage}%
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Year 1 Net ROI:</span>
            <span className="text-lg font-semibold">
              ${Number(yearOneROI).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>* Conservative estimates based on 40% productivity improvement</p>
          <p>* License cost: $200/month per developer (Claude Pro)</p>
          <p>* Typical time savings: 60-70 hours per developer per month</p>
        </div>
      </CardContent>
    </Card>
  );
}
