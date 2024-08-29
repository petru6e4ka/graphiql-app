import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Footer } from './Footer';

describe('Layout component', () => {
  test('Footer renders', () => {
    render(
      <NextIntlClientProvider locale="en">
        <Footer />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('img', { name: 'RSSchool' })).toHaveProperty('alt', 'RSSchool');
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Evgeny')).toHaveProperty('href', 'https://github.com/zytsev');
    expect(screen.getByText('Anastasiia')).toHaveProperty('href', 'https://github.com/petru6e4ka');
    expect(screen.getByText('Ivan')).toHaveProperty('href', 'https://github.com/mindvan');
  });
});
