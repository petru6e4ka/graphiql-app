import {
  describe, expect, test, vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { EmptyHistory } from './EmptyHistory';

describe('EmptyHistory component', async () => {
  test('EmptyHistory renders', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    await renderWithWrappers(<EmptyHistory />);

    expect(screen.getByText("You haven't executed any requests. It's empty here. Try:")).toBeInTheDocument();
    expect(screen.getByText('REST')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });
});
