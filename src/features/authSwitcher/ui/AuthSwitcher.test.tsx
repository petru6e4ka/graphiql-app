import {
  describe, expect, test, vi,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { beforeEach } from 'node:test';
import { AuthSwitcher } from './AuthSwitcher';

beforeEach(() => {
  vi.mock('next-auth/react');
});

describe('AuthSwitcher component', () => {
  test('Renders buttons for guest users', async () => {
    vi.mock('next/navigation');

    await renderWithWrappers(<AuthSwitcher locale="en" session={null} />);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.queryByText('Log out')).not.toBeInTheDocument();
  });

  test('Renders buttons for authentificated users', async () => {
    vi.mock('next/navigation');

    const session = {
      user: {
        name: 'Test',
        email: 'test@test.test',
      },
      expires: '3600',
    };

    await renderWithWrappers(<AuthSwitcher locale="en" session={session} />);

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('Logs out', async () => {
    vi.mock('next/navigation');

    const session = {
      user: {
        name: 'Test',
        email: 'test@test.test',
      },
      expires: '3600',
    };

    await renderWithWrappers(<AuthSwitcher locale="en" session={session} />);

    const auth = await import('next-auth/react');
    const spy = vi.spyOn(auth, 'signOut');
    const logoutBtn = screen.getByText('Log out');

    fireEvent.click(logoutBtn);

    expect(spy).toHaveBeenCalled();
  });

  test('Sign in', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    await renderWithWrappers(<AuthSwitcher locale="en" session={null} />);

    const loginBtn = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/en/signin');
  });

  test('Sign up', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    await renderWithWrappers(<AuthSwitcher locale="en" session={null} />);

    const signupBtn = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(signupBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/en/signup');
  });
});
