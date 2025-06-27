import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const cookieKey = request.cookies.get('APIKEY')?.value
    const expectedKey = process.env.APIKEY

    const isAuthenticated = cookieKey === expectedKey

    const { pathname } = request.nextUrl

    // If trying to access admin but not authenticated
    if (pathname.startsWith('/admin') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If trying to access login page but already authenticated
    if (pathname.startsWith('/login') && isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}
