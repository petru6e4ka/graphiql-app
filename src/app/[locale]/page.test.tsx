import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Page from './page';

const messages = {
  Main: {
    'welcome-non-auth': 'Welcome!',
  },
  Header: {
    'sign-up': 'Sign Up',
    'sign-in': 'Sign In',
    'sign-out': 'Sign Out',
    'toggle-lang': 'Language Toggle',
    langs: {
      en: 'English',
      ru: 'Russian',
      de: 'German',
    },
  },
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    locale: 'en',
    push: vi.fn(),
    replace: vi.fn(),
    query: {},
    asPath: '',
  }),
  usePathname: vi.fn(),
}));

test('Page', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Page />
    </NextIntlClientProvider>,
  );

  expect(screen.getByRole('heading', { level: 1, name: 'Welcome!' })).toBeDefined();
});
