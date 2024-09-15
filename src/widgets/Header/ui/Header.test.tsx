import { describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { Header } from './Header';

vi.mock('@/features/localeSwitcher', () => ({
  usePathname: () => '/rest',
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('Header component', () => {
  test('Header renders', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: null,
    });

    await renderWithWrappers(
      <Header>
        <div>Mock</div>
      </Header>,
    );

    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost:3000/');
    expect(screen.getByText('Mock')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('History')).not.toBeInTheDocument();
    expect(screen.queryByText('REST')).not.toBeInTheDocument();
    expect(screen.queryByText('GraphiQL')).not.toBeInTheDocument();
  });

  test('Header renders menu for authentificated users', async () => {
    const auth = await import('next-auth/react');

    auth.useSession = vi.fn().mockReturnValue({
      data: {
        user: {
          name: 'Test',
          email: 'test@test.test',
        },
      },
    });

    await renderWithWrappers(
      <Header>
        <div>Mock</div>
      </Header>,
    );

    expect(screen.getByText('Home')).toHaveProperty('href', 'http://localhost:3000/');
    expect(screen.getByText('History')).toHaveProperty('href', 'http://localhost:3000/history');
    expect(screen.getByText('REST')).toHaveProperty('href', 'http://localhost:3000/rest');
    expect(screen.getByText('GraphiQL')).toHaveProperty('href', 'http://localhost:3000/graphiql');
  });
});
