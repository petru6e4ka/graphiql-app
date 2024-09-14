import {
  describe, expect, test, vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import History from './page';

describe('History page', async () => {
  test('History renders', async () => {
    vi.mock('next/navigation');
    vi.mock('@/features/localeSwitcher');

    await renderWithWrappers(<History />);
    expect(screen.getByRole('heading', { name: /History Requests:/i, level: 1 })).toBeInTheDocument();
  });
});
