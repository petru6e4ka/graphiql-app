import {
  describe, expect, test, vi,
} from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { HeadersSection } from './HeadersSection';

describe('HeadersSection component', () => {
  test('Renders without elements', async () => {
    await renderWithWrappers(
      <HeadersSection add={vi.fn()} remove={vi.fn()} update={vi.fn()} items={[]}>
        Headers
      </HeadersSection>,
    );

    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByAltText('Plus')).toBeInTheDocument();
    expect(screen.getByAltText('Plus')).toHaveProperty('alt', 'Plus');
  });

  test('Renders with elements', async () => {
    await renderWithWrappers(
      <HeadersSection add={vi.fn()} remove={vi.fn()} update={vi.fn()} items={[{ id: 'test', name: '', value: '' }]}>
        Headers
      </HeadersSection>,
    );

    fireEvent.click(screen.getByAltText('Plus'));
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByAltText('Close')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
  });
});
