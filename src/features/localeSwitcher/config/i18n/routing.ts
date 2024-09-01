import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from '../locales';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const {
  Link, redirect, usePathname, useRouter,
} = createSharedPathnamesNavigation(routing);
