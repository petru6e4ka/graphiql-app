import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { NotHistory } from './NotHistory';

describe('NotHistory component', () => {
  test('NotHistory renders', async () => {
    await renderWithWrappers(<NotHistory />);

    expect(screen.getByText(/You haven't executed any requests./)).toBeInTheDocument();
    expect(screen.getByText('Rest')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  test('Buttons mast have links to Rest and GraphQL clients', async () => {
    await renderWithWrappers(<NotHistory />);

    expect(screen.getByRole('link', { name: 'GraphQL' })).toHaveAttribute('href', '/graphiql');
    expect(screen.getByRole('link', { name: 'Rest' })).toHaveAttribute('href', '/rest');
  });
});
