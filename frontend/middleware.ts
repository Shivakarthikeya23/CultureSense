import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Temporarily disabled middleware - using client-side AuthGuard instead
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    '/auth/:path*',
  ],
} 