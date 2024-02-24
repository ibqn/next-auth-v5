import { auth } from "@/auth"
import {
  DEFAULT_SIGN_IN_REDIRECT,
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"
import { NextResponse } from "next/server"

export default auth((request) => {
  const { nextUrl } = request
  const isLoggedIn = !!request.auth
  const isAdmin = request.auth?.user?.role === "ADMIN"

  const requestHeaders = new Headers(request.headers)
  // New request headers
  requestHeaders.set("x-origin", request.nextUrl.origin)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return response
  }

  if (isAdminRoute) {
    if (isAdmin) {
      return response
    }

    return NextResponse.rewrite(new URL("/404", nextUrl))
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl))
    }
    return response
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl))
  }

  return response
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
