import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';

export async function renderWithWrappers(ui: React.ReactNode) {
  const common = await import('../../../../public/messages/en.json');

  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <NextIntlClientProvider locale="en" messages={common}>
        <MantineProvider>{children}</MantineProvider>
      </NextIntlClientProvider>
    ),
  });
}
