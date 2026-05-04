// ─── Middleware ───────────────────────────────────────────────────────────────
// Refreshes the Supabase session on every request so the server always has
// an up-to-date session. Protects /account/* routes — redirects unauthenticated
// users to /account/login, and redirects logged-in users away from auth pages.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — critical for keeping auth tokens alive
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /account/* (except login/register) and /checkout
  const isProtectedAccount =
    pathname.startsWith("/account") &&
    !pathname.startsWith("/account/login") &&
    !pathname.startsWith("/account/register");
    
  const isProtectedCheckout = pathname.startsWith("/checkout");

  if ((isProtectedAccount || isProtectedCheckout) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/account/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (
    user &&
    (pathname === "/account/login" || pathname === "/account/register")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  // Protect /admin/*
  if (pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/account/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      // Not an admin, send to home page or standard account page
      const url = request.nextUrl.clone();
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico / public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
