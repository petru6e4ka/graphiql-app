import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from './page';

describe('Page', () => {
  it('Has title', () => {
    render(<Page />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
