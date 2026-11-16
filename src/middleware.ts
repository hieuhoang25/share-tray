import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'share-tray-dev-secret-key-at-least-32-chars-long'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login?returnUrl=/admin', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login?returnUrl=/admin', request.url));
    }
  }

  // Protect /tables/new, /profile
  if (pathname.startsWith('/tables/new') || pathname.startsWith('/profile')) {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL(`/login?returnUrl=${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/tables/new', '/profile/:path*'],
};
