import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ROOT_PATH = "/"
const LOGIN_PATH = "/login"

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get("fake_jwt")?.value

    if (pathname.startsWith(LOGIN_PATH)) {
        if (token) {
            return NextResponse.redirect(new URL(ROOT_PATH, req.url))
        }
        return NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!_next|api|.*\\..*).*)",
    ],
}
