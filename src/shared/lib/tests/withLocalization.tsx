import { render as testingLibraryRender } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

export async function renderWithLocalization(ui: React.ReactNode) {
  const common = await import('../../../../public/messages/en.json');

  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <NextIntlClientProvider locale="en" messages={common}>
        {children}
      </NextIntlClientProvider>
    ),
  });
}
