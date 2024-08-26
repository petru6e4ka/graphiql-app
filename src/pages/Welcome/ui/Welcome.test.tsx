import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Welcome } from './Welcome';

describe('Page', () => {
  it('Has title', () => {
    render(<Welcome />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
