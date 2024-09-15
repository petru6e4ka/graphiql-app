import { describe, expect, test, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { AuthSwitcher } from './AuthSwitcher';

beforeEach(() => {
  vi.mock('next-auth/react');
});

describe('AuthSwitcher component', () => {
  test('Renders buttons for guest users', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<AuthSwitcher />);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.queryByText('Log out')).not.toBeInTheDocument();
  });

  test('Renders buttons for authentificated users', async () => {
    vi.mock('next/navigation');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
        expires: '3600',
      },
    });

    await renderWithWrappers(<AuthSwitcher />);

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('Logs out', async () => {
    vi.mock('next/navigation');

    const nav = await import('@/features/localeSwitcher');

    nav.useRouter = vi.fn().mockReturnValue({
      push() {},
    });

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
        expires: '3600',
      },
    });

    auth.signOut = vi.fn().mockResolvedValue({});

    await renderWithWrappers(<AuthSwitcher />);

    const spy = vi.spyOn(auth, 'signOut');
    const logoutBtn = screen.getByText('Log out');

    fireEvent.click(logoutBtn);

    expect(spy).toHaveBeenCalled();
  });

  test('Sign in', async () => {
    const nextRouter = await import('@/features/localeSwitcher');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<AuthSwitcher />);

    const loginBtn = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/signin');
  });

  test('Sign up', async () => {
    const nextRouter = await import('@/features/localeSwitcher');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<AuthSwitcher />);

    const signupBtn = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(signupBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/signup');
  });
});
