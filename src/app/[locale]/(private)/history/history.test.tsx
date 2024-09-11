import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import History from './page';

describe('History page', () => {
  test('History renders', async () => {
    await renderWithWrappers(<History />);
    expect(screen.getByRole('heading', { name: /History Requests:/i, level: 1 })).toBeInTheDocument();
  });
});
