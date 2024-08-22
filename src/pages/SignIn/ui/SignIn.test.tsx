import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignIn } from './SignIn';

test('SignIn page', () => {
  render(<SignIn />);
  expect(screen.getByRole('heading', { level: 1, name: 'Sign in' })).toBeDefined();
});
