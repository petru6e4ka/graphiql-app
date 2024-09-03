import {
  beforeEach, expect, test, vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { describe } from 'node:test';
import Page from './page';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Signin page', () => {
  test('Renders form', async () => {
    vi.mock('next/navigation');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page />);

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });
});
