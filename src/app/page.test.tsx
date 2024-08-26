import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';

describe('Page component', () => {
  test('Page renders', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDefined();
  });
});
