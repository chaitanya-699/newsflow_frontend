import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Allow Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icons') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Allow the demo page itself
  if (pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  // If user hasn't acknowledged demo notice, redirect to /demo
  const hasAck = req.cookies.get('nf_demo_ack')?.value === '1';
  if (!hasAck) {
    const url = req.nextUrl.clone();
    url.pathname = '/demo';
    // Preserve original destination to return after continue
    url.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

