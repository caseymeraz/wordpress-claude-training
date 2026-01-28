import { PasswordForm } from '@/components/auth/password-form';

export default function AccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            WordPress + Claude Code
          </h1>
          <p className="text-muted-foreground">
            6-Week Training Program
          </p>
        </div>

        <PasswordForm />

        <div className="text-center text-sm text-muted-foreground">
          <p>Contact your team lead if you need access.</p>
        </div>
      </div>
    </div>
  );
}
