'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Home,
  LayoutDashboard,
  FileText,
  GraduationCap,
} from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Home', href: '/', icon: Home },
      { title: 'Dashboard', href: '/dashboard/progress', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Training',
    items: [
      { title: 'Week 1: Foundation', href: '/training/week-1', icon: GraduationCap },
      { title: 'Week 2: WP Patterns', href: '/training/week-2', icon: GraduationCap },
      { title: 'Week 3: Debugging', href: '/training/week-3', icon: GraduationCap },
      { title: 'Week 4: Automation', href: '/training/week-4', icon: GraduationCap },
      { title: 'Week 5: Custom Skills', href: '/training/week-5', icon: GraduationCap },
      { title: 'Week 6: Production', href: '/training/week-6', icon: GraduationCap },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Quick Reference', href: '/resources/quick-reference', icon: BookOpen },
      { title: 'Templates', href: '/resources/templates', icon: FileText },
      { title: 'Skills Library', href: '/resources/skills', icon: FileText },
    ],
  },
];

export function TrainingSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Training Hub</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 px-3 pb-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title} className="space-y-1">
            <h4 className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
