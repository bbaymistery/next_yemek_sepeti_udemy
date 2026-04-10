import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Oturum varsa bu fonksiyon çalışır
  function middleware(req) {
    const { token } = req.nextauth;
    const pathname = req.nextUrl.pathname;

    // Admin sayfasına erişmeye çalışan ama admin rolü olmayan kullanıcıyı kovuyoruz
    if (pathname.startsWith("/admin/profile") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Bu callback: "Bu kullanıcı giriş yapmış mı?" sorusunu yanıtlar
      // true → middleware fonksiyonu çalışır
      // false → signIn sayfasına yönlendirir
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

// Middleware'in hangi sayfalarda devreye gireceğini belirliyoruz
export const config = {
  matcher: [
    "/profile/:path*",      // Kullanıcı profil sayfaları
    "/admin/profile/:path*", // Admin paneli
  ],
};
