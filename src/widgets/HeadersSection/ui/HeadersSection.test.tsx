import { describe, expect, test } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithWrappers } from '@/shared/lib/tests/withWrappers';
import { HeadersSection } from './HeadersSection';

describe('HeadersSection component', () => {
  test('Headers renders', async () => {
    await renderWithWrappers(<HeadersSection />);

    expect(screen.getByAltText('Plus')).toHaveProperty('alt', 'Plus');
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByAltText('Plus')).toBeInTheDocument();
  });

  test('Inputs renders after click of button "plus"', async () => {
    await renderWithWrappers(<HeadersSection />);

    fireEvent.click(screen.getByAltText('Plus'));
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByAltText('Close')).toBeInTheDocument();
  });
});
