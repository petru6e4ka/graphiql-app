import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('header component', () => {
  test('Header renders', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveProperty('href', 'http://localhost:3000/');
    expect(screen.getByText('English')).toBeDefined();
    expect(screen.getByText('Russian')).toBeDefined();
    expect(screen.getByText('Deutsch')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeDefined();
  });
});
