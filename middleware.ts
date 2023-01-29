import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

import { DEFAULT_LOCALE, LOCALES } from './i18n';

// Get the preferred locale, similar to above or using a library
function getLocale(request) {
  const acceptLangaugeHeader = request.headers.get('accept-language');
  const rawHeaderLocales = acceptLangaugeHeader.split(',');
  const cleanedLocales = rawHeaderLocales.map((language) =>
    language.split(';')[0].trim()
  );

  return match(cleanedLocales, LOCALES, DEFAULT_LOCALE);
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/',
  ],
};
