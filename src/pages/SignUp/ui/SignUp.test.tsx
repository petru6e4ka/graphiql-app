import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignUp } from './SignUp';

test('SignUp page', () => {
  render(<SignUp />);
  expect(screen.getByRole('heading', { level: 1, name: 'Sign up' })).toBeDefined();
});
