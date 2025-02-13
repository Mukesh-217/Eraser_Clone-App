import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
    const session = getKindeServerSession();
    const isAuthenticated = await session.isAuthenticated();

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
};
