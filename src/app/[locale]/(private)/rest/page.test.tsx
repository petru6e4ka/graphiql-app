import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import Rest from './page';

describe('Rest page', async () => {
  test('Rest renders', async () => {
    await renderWithWrappers(<Rest />);
    expect(screen.getByRole('heading', { name: /Rest client/i, level: 1 })).toBeInTheDocument();
  });
});
