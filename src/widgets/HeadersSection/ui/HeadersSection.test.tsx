import {
  describe, expect, test, vi,
} from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { HeadersSection } from './HeadersSection';

describe('HeadersSection component', () => {
  test('Headers renders', async () => {
    await renderWithWrappers(
      <HeadersSection add={vi.fn()} remove={vi.fn()}>
        Headers
      </HeadersSection>,
    );

    expect(screen.getByAltText('Plus')).toHaveProperty('alt', 'Plus');
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByAltText('Plus')).toBeInTheDocument();
  });

  test('Inputs renders after click of button "plus"', async () => {
    await renderWithWrappers(
      <HeadersSection add={vi.fn()} remove={vi.fn()}>
        Headers
      </HeadersSection>,
    );

    fireEvent.click(screen.getByAltText('Plus'));
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByAltText('Close')).toBeInTheDocument();
  });

  test('Inputs remove after click of button "close"', async () => {
    await renderWithWrappers(
      <HeadersSection add={vi.fn()} remove={vi.fn()}>
        Headers
      </HeadersSection>,
    );

    fireEvent.click(screen.getByAltText('Plus'));
    fireEvent.click(screen.getByAltText('Close'));
    expect(screen.queryByText('Key')).not.toBeInTheDocument();
    expect(screen.queryByText('Value')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Key')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Value')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Close')).not.toBeInTheDocument();
  });
});
