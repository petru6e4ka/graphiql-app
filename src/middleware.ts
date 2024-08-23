import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/locales';

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ['/', '/(en|de|ru)/:path*'],
};
