import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statik dosyaları atla
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') || 
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Pathname'in desteklenen bir dil ile başlayıp başlamadığını kontrol et
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Dil yoksa varsayılan dile yönlendir (TR)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Bütün yolları (path) eşleştir, ancak statik ve api yollarını atla
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
