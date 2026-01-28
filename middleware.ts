import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateCookie } from '@/lib/auth/password';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to the password entry page and API routes
  if (pathname === '/access' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth token cookie
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthenticated = validateCookie(authToken);

  if (!isAuthenticated) {
    // Redirect to password entry page
    return NextResponse.redirect(new URL('/access', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
