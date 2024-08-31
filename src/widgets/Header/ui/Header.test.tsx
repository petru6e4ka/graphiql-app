import {
  describe, expect, test, vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { Header } from './Header';

vi.mock('next/navigation', () => ({
  usePathname: () => 'en/rest',
}));

describe('Header component', () => {
  test('Header renders', async () => {
    await renderWithWrappers(
      <Header locale="en" session={null}>
        <div>Mock</div>
      </Header>,
    );

    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost:3000/en');
    expect(screen.getByText('Mock')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('History')).not.toBeInTheDocument();
    expect(screen.queryByText('REST')).not.toBeInTheDocument();
    expect(screen.queryByText('GraphiQL')).not.toBeInTheDocument();
  });

  test('Header renders menu for authentificated users', async () => {
    await renderWithWrappers(
      <Header locale="en" session={{ user: { name: 'Test' }, expires: '3600' }}>
        <div>Mock</div>
      </Header>,
    );

    expect(screen.getByText('Home')).toHaveProperty('href', 'http://localhost:3000/en');
    expect(screen.getByText('History')).toHaveProperty('href', 'http://localhost:3000/en/history');
    expect(screen.getByText('REST')).toHaveProperty('href', 'http://localhost:3000/en/rest');
    expect(screen.getByText('GraphiQL')).toHaveProperty('href', 'http://localhost:3000/en/graphiql');
  });
});
