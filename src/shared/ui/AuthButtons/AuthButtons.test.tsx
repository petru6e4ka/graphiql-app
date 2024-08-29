import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { AuthButtons } from './AuthButtons';

describe('AuthButtons component', () => {
  test('buttons renders', () => {
    render(
      <NextIntlClientProvider locale="en">
        <AuthButtons />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('button', { name: /sign-in/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign-up/ })).toBeInTheDocument();
  });
});
