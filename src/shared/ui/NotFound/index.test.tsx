import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundIcon } from './index';

describe('NotFoundIcon', () => {
  it('renders the SVG element with the correct attributes', () => {
    render(<NotFoundIcon />);

    const svgElement = screen.getByTestId('not-found-icon');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 362 145');
  });
});
