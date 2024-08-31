import {
  beforeEach, expect, test, vi,
} from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { describe } from 'node:test';
import Page from './page';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Welcome page', () => {
  test('For not authentificated', async () => {
    vi.mock('next/navigation');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    expect(screen.getByText('Nice to meet you!')).toBeInTheDocument();
    expect(screen.getByText('Lets auth! And feel free to use our REST and GraphiQL client')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  test('For authentificated', async () => {
    vi.mock('next/navigation');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    expect(screen.getByText('Hello, Test!')).toBeInTheDocument();
    expect(screen.getByText("Let's start making requests")).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'REST' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'GraphiQL' })).toBeInTheDocument();
  });

  test('Sign in', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    const loginBtn = screen.getByRole('button', { name: 'Sign in' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('en/signin');
  });

  test('Sign up', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    const loginBtn = screen.getByRole('button', { name: 'Sign up' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('en/signup');
  });

  test('Rest', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    const loginBtn = screen.getByRole('button', { name: 'REST' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('en/rest');
  });

  test('graphiql', async () => {
    const nextRouter = await import('next/navigation');

    nextRouter.useRouter = vi.fn().mockReturnValue({
      push: vi.fn(),
    });

    const spyFn = vi.spyOn(nextRouter.useRouter(), 'push');

    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(<Page params={{ locale: 'en' }} />);

    const loginBtn = screen.getByRole('button', { name: 'GraphiQL' });

    fireEvent.click(loginBtn);

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledWith('en/graphiql');
  });
});
