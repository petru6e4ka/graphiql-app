import createMiddleware from 'next-intl/middleware';
import { routing } from '@/features/localeSwitcher/config/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|de|ru)/:path*'],
};
