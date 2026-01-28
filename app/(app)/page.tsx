import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, TrendingUp, Zap, Rocket, Heart } from 'lucide-react';
import { ROICalculator } from '@/components/dashboard/roi-calculator';

export default function HomePage() {
  // Force cache clear - updated 2026-01-28
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

      {/* Future Vision Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Future with Claude Code
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how your workflow transforms when AI becomes your development partner
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Card 1: Website Redesign */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    From Overwhelmed to In Control
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Website Redesign Project
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="text-sm font-semibold text-muted-foreground">Before Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>40 hours: Manual theme customization</li>
                  <li>8 hours: Debug responsive issues</li>
                  <li>6 hours: Cross-browser testing</li>
                  <li>4 hours: Performance optimization</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-red-600">
                  Total: 58 hours (1.5 weeks of stress)
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-muted-foreground">After Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>12 hours: AI-assisted theme customization</li>
                  <li>2 hours: Automated responsive testing</li>
                  <li>1 hour: AI-optimized performance</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-green-600">
                  Total: 15 hours (Done by Wednesday, home by 5pm)
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-foreground">
                  Ship the same quality in 1/4 the time. Take on 3x more projects without hiring.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Custom Plugin Development */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    From &apos;I Can&apos;t&apos; to &apos;I Built It&apos;
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Custom E-commerce Feature Request
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="text-sm font-semibold text-muted-foreground">Before Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>&quot;That&apos;ll take 2 weeks and cost $4,000&quot;</li>
                  <li>Turn down advanced features (too complex)</li>
                  <li>Rely on pre-built plugins (limited customization)</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-red-600">
                  Result: Lost revenue, frustrated clients
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-muted-foreground">After Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>&quot;I can have that ready by Friday&quot;</li>
                  <li>Build custom solutions in hours, not weeks</li>
                  <li>Competitive advantage over plugin-only shops</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-green-600">
                  Result: Premium pricing, happy clients, referrals
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-foreground">
                  Your agency becomes the team that says &apos;yes&apos; to complex projects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Work-Life Balance */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    From Burnout to Balance
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Typical Work Week Reality
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="text-sm font-semibold text-muted-foreground">Before Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>50-60 hour weeks to hit deadlines</li>
                  <li>Weekends spent debugging</li>
                  <li>Constant context switching (drains energy)</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-red-600">
                  Reality: Burned out, considering career change
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-muted-foreground">After Claude Code</span>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>40-hour weeks with buffer time</li>
                  <li>Evenings and weekends free</li>
                  <li>AI handles grunt work, you do creative problem-solving</li>
                </ul>
                <div className="ml-4 text-sm font-semibold text-green-600">
                  Reality: Energized, growing, thriving
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-foreground">
                  Love WordPress development again. Build a sustainable career, not just a job.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
