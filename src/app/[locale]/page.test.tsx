import { expect, test, vi, afterEach, describe } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import Page from './page';

describe('Welcome page', async () => {
  const nextRouter = await import('@/features/localeSwitcher');

  nextRouter.useRouter = vi.fn().mockReturnValue({
    push: vi.fn(),
  });

  const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('For not authentificated', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page />);

    expect(screen.getByText('Nice to meet you!')).toBeInTheDocument();
    expect(screen.getByText('Lets auth! And feel free to use our REST and GraphiQL client')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  test('For authentificated', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page />);

    expect(screen.getByText('Hello, Test!')).toBeInTheDocument();
    expect(screen.getByText("Let's start making requests")).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'REST' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'GraphiQL' })).toBeInTheDocument();
  });

  test('Sign in', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page />);

    const loginBtn = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/signin');
  });

  test('Sign up', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page />);

    const loginBtn = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/signup');
  });

  test('Rest', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page />);

    const loginBtn = screen.getByRole('button', { name: 'REST' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/rest');
  });

  test('graphiql', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page />);

    const loginBtn = screen.getByRole('button', { name: 'GraphiQL' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('/graphiql');
  });
});
