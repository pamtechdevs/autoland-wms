// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const PUBLIC_PATHS = ["/", "/login", "/signup"];

// const verifyJWT = async (token: string) => {
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
//     await jwtVerify(token, secret); // Changed to await and removed unnecessary return
//     return true; // Token is valid
//   } catch (error) {
//     console.error("JWT Verification Error:", error); // Log the error for debugging
//     return false; // Invalid token
//   }
// };

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   // Allow access to public paths
//   if (PUBLIC_PATHS.some((path) => pathname === path)) {
//     // Changed to strict equality
//     return NextResponse.next();
//   }

//   // Check for token existence first
//   if (!token) {
//     if (!PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   } else {
//     // Verify token if it exists
//     const isValidToken = await verifyJWT(token);
//     if (!isValidToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };
