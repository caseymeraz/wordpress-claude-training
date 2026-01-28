import { Header } from '@/components/nav/header';
import { TrainingSidebar } from '@/components/nav/training-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <TrainingSidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 md:pl-64">
        <Header />
        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
