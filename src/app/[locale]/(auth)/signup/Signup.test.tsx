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

describe('Signup page', () => {
  test('Renders form', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    vi.mock('firebase/auth');
    vi.mock('firebase/firestore');
    vi.mock('firebase/app', () => ({
      auth: vi.fn(),
      getApps: vi.fn().mockReturnValue({
        getApps: vi.fn().mockReturnValue({
          length: 1,
        }),
      }),
      initializeApp: vi.fn(),
    }));

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page />);

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });
});
