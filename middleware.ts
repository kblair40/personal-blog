import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import { decrypt } from "@/lib/jwt";
import { cookies } from "next/headers";

// 1. Specify protected and public routes

const publicRoutes = ["/login", "/signup", "/oneblog", "/"];

export default async function middleware(req: NextRequest) {
  console.log("\n\n\n\nMIDDLEWARE\n\n\n\n");

  // // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log("\n\n\n\nPATH:", path, "\n\n\n\n");
  const isProtectedRoute = path.startsWith("/oneblog");
  const isPublicRoute = publicRoutes.includes(path);

  // // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  console.log("\nCookie:", cookie, "\n");
  console.log("cookie.value:", cookie, "\n");
  const session = await decrypt(cookie);
  console.log("\nSession:", session);

  // // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // // 5. Redirect to /oneblog if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/oneblog")
  ) {
    return NextResponse.redirect(new URL("/oneblog", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware SHOULD run on
export const config: MiddlewareConfig = {
  matcher: ["/oneblog", "/oneblog/:path"],
};
