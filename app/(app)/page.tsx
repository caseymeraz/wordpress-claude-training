import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { ROICalculator } from '@/components/dashboard/roi-calculator';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          WordPress + Claude Code Training
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Transform your WordPress development workflow with AI-powered coding assistance.
          Complete this 6-week program to master Claude Code and increase productivity by 40%+.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Duration</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 Weeks</div>
            <p className="text-xs text-muted-foreground">2 hours per week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,559%</div>
            <p className="text-xs text-muted-foreground">Year 1 return</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Savings</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65 hrs/mo</div>
            <p className="text-xs text-muted-foreground">Per developer</p>
          </CardContent>
        </Card>
      </div>

      {/* Training overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { week: 1, title: 'Foundation', description: 'Install Claude Code, create CLAUDE.md, understand autonomous AI', href: '/training/week-1' },
          { week: 2, title: 'WordPress Patterns', description: 'ACF field groups, Gutenberg blocks, security best practices', href: '/training/week-2' },
          { week: 3, title: 'Debugging & Legacy Code', description: 'Debug real issues, document legacy code, refactor', href: '/training/week-3' },
          { week: 4, title: 'Automation', description: 'Configure PHPCS hooks, automated testing, quality enforcement', href: '/training/week-4' },
          { week: 5, title: 'Custom Skills', description: 'Build team skill library, share workflows, advanced automation', href: '/training/week-5' },
          { week: 6, title: 'Production Integration', description: 'Claude-assisted code review, deployment checklist, team standards', href: '/training/week-6' },
        ].map((item) => (
          <Card key={item.week} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                    {item.week}
                  </div>
                  <CardTitle className="text-lg">Week {item.week}</CardTitle>
                </div>
              </div>
              <CardDescription className="font-medium text-foreground">
                {item.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>
              <Link href={item.href}>
                <Button variant="outline" size="sm" className="w-full group">
                  Start Week {item.week}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Calculate Your ROI</h2>
          <p className="text-muted-foreground">
            See how much time and money your team can save with Claude Code training
          </p>
        </div>
        <ROICalculator />
      </div>

      {/* CTA section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Ready to get started?</CardTitle>
          <CardDescription>
            Begin with Week 1 to install Claude Code and create your first CLAUDE.md file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Link href="/training/week-1">
              <Button>Start Week 1</Button>
            </Link>
            <Link href="/dashboard/progress">
              <Button variant="outline">View Progress</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
